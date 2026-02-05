# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 说明：本仓库暂不维护 `README.md` / `docs/README.md`；项目使用说明、文档索引与迭代规范统一收敛在本文件。

## 📋 快速参考

### 常用命令

```bash
# 本地开发
npm run dev              # 启动开发服务器（http://localhost:5173）
npm run build            # 构建生产版本到 dist/
npm run preview          # 预览构建结果

# 代码检查
npx html-validate index.html           # HTML 验证
npx stylelint public/css/styles.css    # CSS 检查
npx eslint public/js/script.js         # JS 检查
```

### 关键路径

| 类型       | 路径                         | 说明                          |
| ---------- | ---------------------------- | ----------------------------- |
| 主页面     | `index.html`                 | 页面骨架（通过 include 组合） |
| HTML 片段  | `src/html/sections/`         | 各区域 HTML 模块              |
| 样式       | `public/css/styles.css`      | 主样式文件                    |
| 交互       | `public/js/script.js`        | 主脚本文件                    |
| 图片资源   | `public/assets/images/`      | 所有图片素材                  |
| 服务详情页 | `services/<slug>/index.html` | 6 个服务详情页                |

### 重要文档

- 📋 [产品需求文档](./docs/PRD.md) - 功能规格说明
- 📚 [版本历史](./docs/VERSION_HISTORY.md) - 迭代版本记录
- 🔄 [变更日志](./CHANGELOG.md) - 所有变更记录
- ✅ [测试规范](./docs/TESTING.md) - 测试清单与标准

### 部署地址

- 生产环境：`https://www.eagleslab.com`
- 部署方式：GitHub Actions 自动部署（push 到 main 分支）

### 技术要点

- **构建工具**：Vite 4.x
- **Node 版本**：v22.16.0（使用 `nvm use` 切换）
- **CSS 变量**：所有颜色/尺寸定义在 `:root`
- **响应式断点**：768px（平板）、480px（手机）
- **性能目标**：Lighthouse ≥ 90 分

---

## Project Overview

**EaglesLab 官网首页** - 面向大学生升学和就业的解决方案提供商营销型官网，采用流体智能设计风格。

- **项目类型**: 静态营销页面（纯 HTML/CSS/JavaScript）
- **设计风格**: 流体智能（流动渐变、玻璃态效果、科技前沿感）
- **目标用户**: 大学生（大一新生、大二至大四学生）、学生家长
- **核心目标**: 建立信任、提升咨询转化率（目标 ≥5%）
- **核心数据**: 10年经验 / 2000+学员 / 85%就业率 / 95%升学率

## Repository Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions 自动部署
├── .gitignore     # Git 忽略规则
├── package.json    # Vite 构建与依赖
├── vite.config.js  # Vite 配置（含 HTML include 插件）
├── index.html      # 主页面 - 包含所有模块的完整结构
├── public/         # Vite 静态资源目录（build 时原样复制到 dist/）
│   ├── css/                # 样式目录
│   │   ├── styles.css           # 主样式 - 流体智能风格实现
│   │   └── maintainability.css  # 交互/状态覆写层（减少行内样式耦合）
│   ├── js/                 # 脚本目录
│   │   └── script.js   # 交互脚本 - 表单、滚动动画等
│   └── assets/             # 静态资源目录
│       └── images/         # 图片资源（Logo、插画等）
├── src/            # 源码拆分目录
│   └── html/       # HTML 片段（index.html 通过 include 组合）
│       ├── partials/
│       └── sections/
├── docs/           # 文档目录
│   ├── PRD.md          # 最新版本的产品需求文档
│   ├── PRD_v1.0.md     # v1.0 (MVP) 版本快照
│   └── VERSION_HISTORY.md  # 版本历史记录
└── CLAUDE.md       # 本文件 - 开发指南
```

## Documentation & Versioning

### 📁 文档文件说明

- `docs/PRD.md`：最新版本的产品需求文档（始终保持为 Latest）
- `docs/PRD_v{X.Y}.md`：每次迭代的 PRD 快照（用于追溯历史需求与决策）
- `docs/VERSION_HISTORY.md`：版本历史记录（发布日期、完成功能、技术变更、待完成项）

### 🔄 迭代开发流程

1. 准备新版本：将当前 `docs/PRD.md` 复制为 `docs/PRD_v{X.Y}.md` 快照（例如 `PRD_v1.1.md`）
2. 更新需求：在 `docs/PRD.md` 中加入/修改新版本需求，保持版本标识为 Latest
3. 开发实现：按 `docs/PRD.md` 开发
4. 更新版本历史：在 `docs/VERSION_HISTORY.md` 中记录本版本的发布日期、完成功能、技术变更、待完成项
5. 标记完成：在 `docs/PRD_v{X.Y}.md` 顶部将状态更新为 “✅ 已完成”

### 🔗 文档索引

- 📋 [产品需求文档 (PRD)](./docs/PRD.md) - 完整的功能规格说明
- 📚 [版本历史](./docs/VERSION_HISTORY.md) - 迭代版本记录
- 🔄 [变更日志](./CHANGELOG.md) - 所有变更记录
- ✅ [测试规范](./docs/TESTING.md) - 测试清单与标准

## Git Commit 规范

### Commit 消息格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| Type       | 说明                                    | 示例                                 |
| ---------- | --------------------------------------- | ------------------------------------ |
| `feat`     | 新功能                                  | `feat(hero): 添加浮动卡片动画效果`   |
| `fix`      | Bug 修复                                | `fix(form): 修复手机号验证正则错误`  |
| `docs`     | 文档变更                                | `docs(readme): 更新部署说明`         |
| `style`    | 样式调整（不影响代码逻辑）              | `style(footer): 调整布局间距`        |
| `refactor` | 代码重构（既不是新功能也不是 Bug 修复） | `refactor(script): 模块化初始化逻辑` |
| `perf`     | 性能优化                                | `perf(images): 图片转 WebP 格式`     |
| `test`     | 测试相关                                | `test(form): 添加表单验证测试`       |
| `build`    | 构建系统或依赖变更                      | `build(vite): 升级到 Vite 5.0`       |
| `ci`       | CI/CD 配置变更                          | `ci(deploy): 优化 rsync 同步策略`    |
| `chore`    | 其他不修改源码的变更                    | `chore: 更新 .gitignore`             |

### Scope 范围（可选）

常用 scope 示例：

- `hero` / `trust` / `contact` / `footer` 等（对应页面区域）
- `styles` / `script`（对应文件）
- `deploy` / `build`（对应构建/部署）
- `images` / `assets`（对应资源）

### Subject 主题

- 使用祈使句，现在时态："添加"而非"已添加"或"添加了"
- 不要大写首字母
- 结尾不加句号
- 简洁明了，≤ 50 字符

### Body 正文（可选）

- 详细说明**为什么**做这个改动，而非**做了什么**
- 可以分多行

### Footer 页脚（可选）

- 关联 Issue：`Closes #123`
- 不兼容变更：`BREAKING CHANGE: xxx`

### 示例

```bash
# 简单提交
git commit -m "feat(hero): 添加 6 个服务卡片浮动动画"

# 完整提交
git commit -m "fix(form): 修复手机号验证正则错误

之前的正则 /^1[3-8]\d{9}$/ 不支持 19 开头的号码，
现更新为 /^1[3-9]\d{9}$/ 以支持所有运营商。

Closes #42"
```

### 提交前检查

- [ ] 代码已在本地测试通过
- [ ] 遵循 Commit 消息格式
- [ ] 必要时更新 CHANGELOG.md
- [ ] 单次提交只包含一个逻辑改动

## 图片资源规范

### 文件格式

- **首选格式**：WebP（体积小、质量高）
- **备选格式**：PNG（需要透明背景）、JPG（照片）
- **图标/Logo**：SVG（矢量图，可无限缩放）

### 命名规范

- 使用**小写英文 + 连字符**：`company-logo.webp`
- 避免中文、空格、特殊字符
- 命名要有意义，能反映内容：`student-success-story-01.webp`

### 目录组织

```
public/assets/images/
├── logo/           # Logo 相关
├── hero/           # Hero 区域插画
├── companies/      # 合作企业 Logo
├── universities/   # 合作高校 Logo
├── certificates/   # 资质认证
├── skills/         # 技能提升素材
│   ├── cisp/       # CISP 认证
│   ├── hcnp/       # HCNP 认证
│   └── rhce/       # RHCE 认证
├── contests/       # 竞赛素材
│   ├── thumb/      # 缩略图
│   └── full/       # 大图
├── qrcode/         # 二维码
└── testimonials/   # 学员头像/案例
```

### 尺寸与质量

| 用途         | 建议尺寸  | 质量 | 大小限制 |
| ------------ | --------- | ---- | -------- |
| Hero 背景    | 1920x1080 | 80%  | ≤ 300KB  |
| 服务卡片图标 | 128x128   | 90%  | ≤ 30KB   |
| Logo         | 200x80    | 90%  | ≤ 50KB   |
| 学员案例照片 | 400x400   | 85%  | ≤ 100KB  |
| 缩略图       | 300x200   | 80%  | ≤ 50KB   |
| 二维码       | 300x300   | 90%  | ≤ 50KB   |

### 优化工具

```bash
# 安装 sharp-cli（批量转换图片格式）
npm install -g sharp-cli

# 批量转换 JPG/PNG 为 WebP
sharp -i "*.jpg" -o "./webp/" -f webp -q 85

# 压缩图片
npx @squoosh/cli --webp auto *.png
```

### 使用规范

在 HTML 中使用 `<picture>` 标签提供降级方案：

```html
<picture>
  <source srcset="/assets/images/hero/banner.webp" type="image/webp" />
  <img src="/assets/images/hero/banner.jpg" alt="描述" />
</picture>
```

### 添加新图片流程

1. 优化图片（压缩、转 WebP）
2. 按类型放入对应目录
3. 按命名规范命名
4. 在代码中引用（使用绝对路径 `/assets/images/...`）
5. 测试在不同设备上的显示效果
6. 提交时在 commit 消息中注明新增图片

## Architecture Overview

### 页面结构（从上到下）

1. **Header（导航栏）** - 固定顶部，玻璃态效果，响应式菜单
2. **Hero Section（首屏）** - "专注大学生升学和就业的解决方案"、核心数据展示（10年/2000+学员/85%就业率/95%升学率）、6个浮动卡片（实习辅导/技能提升/校招冲刺/考研复试/竞赛指导/资源圈子）
3. **Pain Points（痛点共鸣）** - 4个痛点卡片
4. **Solutions（解决方案）** - 3大陪跑服务方向（学业辅导/升学辅导/就业辅导）
5. **Trust（信任背书）** - 10年历史 + 统计数据 + 合作企业 + 合作高校 + 资质认证 + 师资力量
6. **Success Stories（学员案例）** - 6个真实学员案例
7. **Testimonials（学员评价）** - 自动轮播评价
8. **Contact CTA（咨询表单）** - 表单 + 微信二维码
9. **Footer（页脚）** - 导航链接、联系方式、备案信息

### 技术栈

- **前端**: 纯 HTML5/CSS3/ES6 JavaScript
- **字体**: Google Fonts (Outfit + Manrope)
- **图标**: Emoji + SVG
- **动画**: CSS Animations + Intersection Observer API
- **表单验证**: 原生 JavaScript

### 设计系统

#### CSS 变量（定义在 :root）

```css
--bg-primary: #0a0a1f; /* 主背景色 */
--gradient-1: 紫蓝粉渐变; /* 主渐变 */
--accent-purple: #8b5cf6; /* 主色调 */
--blur-glass: blur(20px); /* 玻璃态模糊 */
--transition-smooth: 0.4s; /* 平滑过渡 */
```

#### 核心动画

- `morphing` - 背景 blob 变形动画（20s 循环）
- `floating` - 浮动卡片动画（3s 循环）
- `fadeIn/fadeInUp/slideInLeft` - 入场动画

#### 响应式断点

- Desktop: > 768px
- Tablet: ≤ 768px
- Mobile: ≤ 480px

## Development Commands

### 本地开发

```bash
# 使用 Vite（推荐，支持 HTML 拆分组合）
nvm use v22.16.0
npm install
npm run dev

# 构建产物在 dist/，可本地预览构建结果
npm run build
npm run preview:preview
```

### 代码检查

```bash
# 验证 HTML
npx html-validate index.html

# CSS Lint（可选）
npx stylelint public/css/styles.css

# JS Lint（可选）
npx eslint public/js/script.js
```

## Code Conventions

### HTML

- 使用语义化标签（`<section>`, `<nav>`, `<header>`, `<footer>`）
- 所有交互元素必须有 `aria-label`
- 图片必须有 `alt` 属性
- 表单字段必须有 `required` / `pattern` 验证

### CSS

- 使用 BEM 命名规范变体（`.section-title`, `.card-icon`）
- 优先使用 CSS 变量
- 动画使用 `transform` 和 `opacity`（GPU 加速）
- 移动端优先的响应式设计

### JavaScript

- 使用现代 ES6+ 语法
- 事件监听器统一使用 `addEventListener`
- 避免内联事件处理
- 所有 DOM 操作在 `DOMContentLoaded` 后执行

## Key Features

### 1. 流体背景动画

- 3 个自动变形的 blob（`.blob-1`, `.blob-2`, `.blob-3`）
- 使用 CSS `@keyframes morphing` 实现
- `filter: blur(60px)` 创建柔和效果

### 2. 玻璃态效果

- `backdrop-filter: blur(20px)` 实现毛玻璃
- 半透明背景 `rgba(255, 255, 255, 0.05)`
- 边框 `1px solid rgba(255, 255, 255, 0.1)`

### 3. 滚动动画

- 使用 Intersection Observer API
- 在 `public/js/script.js` 的 `initScrollReveal` 中实现
- 元素进入视口时触发 `fadeInUp` 效果

### 4. 表单验证

- 手机号正则验证：`/^1[3-9]\d{9}$/`
- 所有必填字段使用 `required` 属性
- 提交后显示成功提示（需对接后端）

### 5. 移动端导航

- 汉堡菜单图标（`.mobile-toggle`）
- 点击展开全屏菜单（`.nav-menu.active`）
- 菜单动画：从上滑入

## Deployment

### 主要部署方式：GitHub Actions

仓库已配置自动化部署工作流 `.github/workflows/deploy.yml`：

- **触发条件**：push 到 `main` 分支或手动触发
- **部署流程**：
  1. 自动安装依赖（`npm install`）
  2. 构建生产版本（`npm run build`）
  3. 通过 SSH + rsync 同步 `dist/` 到服务器

#### 配置 Secrets

需要在 GitHub 仓库 Settings → Secrets and variables → Actions 中配置：

| Secret 名称      | 说明                 | 示例                                            |
| ---------------- | -------------------- | ----------------------------------------------- |
| `DEPLOY_HOST`    | 服务器 IP            | `110.42.61.198`                                 |
| `DEPLOY_PORT`    | SSH 端口             | `22`                                            |
| `DEPLOY_USER`    | SSH 用户名           | `root` 或 `deploy`                              |
| `DEPLOY_PATH`    | 部署目录（绝对路径） | `/opt/1panel/www/sites/www.eagleslab.com/index` |
| `DEPLOY_SSH_KEY` | SSH 私钥             | `-----BEGIN OPENSSH PRIVATE KEY-----...`        |

**注意**：工作流会自动通过 `ssh-keyscan` 获取 `known_hosts`，无需手动配置。

---

## Performance & Analytics

### 性能预算

为保证用户体验，所有资源必须遵循以下预算限制：

#### 文件大小限制

| 资源类型         | 大小限制 | 说明                   |
| ---------------- | -------- | ---------------------- |
| 单张图片         | ≤ 200KB  | 压缩后（WebP/JPG）     |
| Hero 背景        | ≤ 300KB  | 大尺寸背景图例外       |
| Logo/图标        | ≤ 50KB   | 小图标应更小（≤ 30KB） |
| 首屏 CSS         | ≤ 50KB   | gzip 压缩后            |
| 首屏 JS          | ≤ 100KB  | gzip 压缩后            |
| 字体文件（单个） | ≤ 100KB  | 每个字重               |
| 总页面大小       | ≤ 2MB    | 首次加载（未缓存）     |

#### Lighthouse 目标分数

| 指标           | 目标 | 最低要求 |
| -------------- | ---- | -------- |
| Performance    | ≥ 95 | ≥ 90     |
| Accessibility  | ≥ 95 | ≥ 90     |
| Best Practices | ≥ 95 | ≥ 90     |
| SEO            | ≥ 95 | ≥ 90     |

#### 核心 Web 指标（Core Web Vitals）

| 指标                | 目标   | 最低要求 |
| ------------------- | ------ | -------- |
| LCP（最大内容绘制） | ≤ 2.0s | ≤ 2.5s   |
| FID（首次输入延迟） | ≤ 50ms | ≤ 100ms  |
| CLS（累积布局偏移） | ≤ 0.05 | ≤ 0.1    |

**测试条件**：Fast 3G 网络、中端移动设备（Moto G4）

---

### 性能优化策略

#### 已实现

- ✅ CSS 动画优先使用 `transform` / `opacity`（GPU 加速）
- ✅ 响应式布局（减少不必要的 DOM 元素）
- ✅ HTML/CSS/JS 分离（便于缓存）
- ✅ Vite 构建优化（代码拆分、Tree Shaking）

#### 待优化

- [ ] 图片懒加载（Intersection Observer）
- [ ] 字体子集化（只加载使用的字符）
- [ ] 关键 CSS 内联（首屏渲染优化）
- [ ] 静态资源上 CDN
- [ ] 开启 Gzip/Brotli 压缩
- [ ] Service Worker（PWA 支持）

#### 性能检查清单

提交代码前检查：

- [ ] 运行 `npm run build` 检查构建产物大小
- [ ] 使用 Chrome DevTools Lighthouse 测试
- [ ] 检查所有图片是否已优化
- [ ] 检查是否有未使用的 CSS/JS
- [ ] 在 Fast 3G 网络下测试加载速度

---

### 分析与监控

#### Google Analytics 集成

在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

#### 百度统计集成

在 `index.html` 的 `</body>` 前添加百度统计代码。

#### 性能监控（推荐）

可选集成方案：

- **Sentry**：错误监控和性能追踪
- **Google Search Console**：SEO 监控
- **Uptime Robot**：网站可用性监控

---

### 浏览器兼容性

**支持的浏览器版本**：

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

**已知兼容性问题**：

- `backdrop-filter`：IE 11 不支持（提供降级方案）
- CSS Grid：IE 11 部分支持（优先使用 Flexbox）

**降级策略**：

```css
/* 提供降级方案 */
.glass-effect {
  background: rgba(255, 255, 255, 0.1); /* 降级方案 */
}

@supports (backdrop-filter: blur(20px)) {
  .glass-effect {
    backdrop-filter: blur(20px); /* 现代浏览器 */
  }
}
```

---

## Todo List (待完善)

根据 PRD 的素材清单，以下内容需要后续补充：

- [x] 品牌 Logo（PNG）- 已完成
- [x] Hero 区域背景插画 - 已完成
- [ ] 真实学员案例（照片 + 详细信息）
- [x] 合作企业 Logo 图片 - 已完成
- [x] 资质证书图片 - 已完成
- [x] Trust 区域师资力量 - 已完成
- [x] 微信二维码图片 - 已完成
- [ ] 表单后端 API 集成（`public/js/script.js` 中的 fetch）
- [ ] Google Analytics / 百度统计集成
- [ ] 在线客服集成（如美洽、智齿）
- [ ] SEO 优化（结构化数据、sitemap.xml）

## Modification Guidelines

### 何时更新 CLAUDE.md

以下情况需要更新本文件：

- 新增/修改关键开发规范
- 新增/修改目录结构
- 新增/修改部署方式
- 新增重要的"常见错误"案例
- 更新技术栈或工具链

**不需要更新本文件的情况**：

- 日常功能开发（在 CHANGELOG.md 记录）
- 样式调整（在 CHANGELOG.md 记录）
- 内容更新（在 CHANGELOG.md 记录）

### 变更记录维护

- **代码变更**：在 `CHANGELOG.md` 中记录（遵循 Keep a Changelog 格式）
- **文档变更**：在 Git Commit 消息中说明（使用 `docs:` type）

### 修改颜色主题

在 `public/css/styles.css` 的 `:root` 中修改 CSS 变量：

```css
:root {
  --accent-purple: #8b5cf6; /* 改为你的品牌色 */
}
```

### 修改字体

在 `public/css/styles.css` 顶部修改 `@import`：

```css
@import url("https://fonts.googleapis.com/css2?family=YourFont&display=swap");
```

### 添加新模块

1. 在 `src/html/sections/` 中新增/修改对应片段（或在 `index.html` 中调整 include 顺序）
2. 在 `public/css/styles.css` 中添加对应样式
3. 如需交互，在 `public/js/script.js` 中添加逻辑
4. 更新响应式规则（`@media` queries）
5. 在 `CHANGELOG.md` 中记录此次变更

### 修改内容

优先编辑 `src/html/sections/` / `src/html/partials/` 中的 HTML 片段；`index.html` 主要用于 include 组合与页面骨架。

---

## Support

### 文档资源

- 📋 [产品需求文档](./docs/PRD.md) - 完整的功能规格说明
- 📚 [版本历史](./docs/VERSION_HISTORY.md) - 迭代版本记录
- 🔄 [变更日志](./CHANGELOG.md) - 所有变更记录（按 Keep a Changelog 格式）
- ✅ [测试规范](./docs/TESTING.md) - 完整的测试清单与标准
- 📖 [开发指南](./CLAUDE.md) - 本文件

### 反馈与支持

- **功能建议 / Bug 反馈**: GitHub Issues
- **开发文档问题**: 直接修改本文件并提 PR
- **紧急问题**: 联系项目负责人

---

**最后更新**: 2026-02-04
**项目状态**: v1.1 - 持续迭代中
**文档版本**: 2.0（全面重构）
