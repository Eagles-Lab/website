import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * HTML 片段“拆分再组合”插件（在 Vite dev/build 阶段生效）
 *
 * 目标：
 * - 保持入口仍为根目录 index.html（便于静态站点部署/SEO）
 * - 允许把超大的 HTML 拆成多个片段文件（src/html/**），提升可维护性
 *
 * 使用方式：
 * - 在 index.html 中写：<!--#include file="src/html/sections/header.html" -->
 * - 插件会在 transformIndexHtml 阶段把 include 指令替换为对应文件内容
 *
 * 约束与安全：
 * - 递归 include 深度限制为 20，防止意外无限递归
 * - 检测循环 include（A include B，B include A）并抛错
 * - dev 模式会把被 include 的文件加入 watcher，修改片段可触发热更新
 *
 * 静态资源（标准 Vite 做法）：
 * - css/、js/、assets/ 等静态目录放到 public/ 下（public/css、public/js、public/assets）
 * - Vite dev 会直接以 /css、/js、/assets 提供访问
 * - Vite build 会把 public/ 下的内容原样复制到 dist/，preview 就能正常加载这些资源
 */
const INCLUDE_RE = /<!--#include\s+file="([^"]+)"\s*-->/g;

function htmlIncludePlugin() {
  let devServer = null;

  const resolveIncludes = (html, { rootDir, fromFile, seen, depth }) => {
    // 递归深度保护：避免 include 形成很深的链路导致栈溢出或构建卡死
    if (depth > 20) {
      throw new Error(`HTML include 深度超过限制：${fromFile}`);
    }

    return html.replace(INCLUDE_RE, (_, includePath) => {
      // includePath 以项目根目录为基准（process.cwd()），例如：src/html/sections/hero.html
      const absPath = path.resolve(rootDir, includePath);

      // 循环引用保护：同一条 include 链路中，出现已访问过的文件即判定为循环
      if (seen.has(absPath)) {
        throw new Error(`检测到循环 include：${absPath}`);
      }

      // 片段缺失时立刻失败，避免构建出一个不完整的 HTML
      if (!fs.existsSync(absPath)) {
        throw new Error(`include 文件不存在：${absPath}`);
      }

      // dev 模式：把片段加入 Vite watcher，编辑片段文件可触发页面刷新
      if (devServer) devServer.watcher.add(absPath);

      const nextSeen = new Set(seen);
      nextSeen.add(absPath);

      // 读取片段内容并继续递归展开（片段内部也可以继续 include）
      const chunk = fs.readFileSync(absPath, "utf8");
      return resolveIncludes(chunk, {
        rootDir,
        fromFile: absPath,
        seen: nextSeen,
        depth: depth + 1,
      });
    });
  };

  return {
    name: "eagleslab-html-include",
    enforce: "pre",
    configureServer(server) {
      // 仅 dev server 存在时注入 watcher；build 阶段不会走这里
      devServer = server;
    },
    transformIndexHtml(html, ctx) {
      // rootDir：解析 include 路径时使用的“基准目录”
      // - 本项目用仓库根目录即可；如未来设置了 Vite 的 root，可在此改为 ctx.server.config.root 或 config.root
      const rootDir = process.cwd();

      // fromFile 用于错误信息与循环检测的“起点文件”
      // - ctx.filename 在 dev 时更准确；build 时兜底为根目录 index.html
      const fromFile = ctx?.filename || path.resolve(rootDir, "index.html");
      return resolveIncludes(html, {
        rootDir,
        fromFile,
        seen: new Set([fromFile]),
        depth: 0,
      });
    },
  };
}

// Build entry points
const resolveEntry = (entry) => path.resolve(process.cwd(), entry);

const ENTRY_PAGES = [
  "index.html",
  "services/internship/index.html",
  "services/skills/index.html",
  "services/campus-recruit/index.html",
  "services/postgraduate-interview/index.html",
  "services/contest/index.html",
  "services/community/index.html",
];

const getBuildInputs = () => {
  const inputs = {};
  for (const page of ENTRY_PAGES) {
    const key = page
      .replace(/^services\//, "")
      .replace(/\/index\.html$/, "")
      .replace(/\//g, "-") || "index";
    inputs[key] = resolveEntry(page);
  }
  return inputs;
};

export default defineConfig({
  plugins: [htmlIncludePlugin()],
  build: {
    rollupOptions: {
      input: getBuildInputs(),
    },
  },
  server: {
    // dev 端口：固定端口便于文档/脚本引用；strictPort=true 避免自动换端口造成"看错环境"
    port: 5173,
    strictPort: true,
  },
  preview: {
    // preview 端口：用于预览 build 产物（dist/），与 dev 分开避免冲突
    port: 4173,
    strictPort: true,
  },
});
