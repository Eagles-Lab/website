# Changelog

本文档记录 EaglesLab 官网首页项目的所有重要变更。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 移除

- 移除 FAQ（常见问题）功能模块
  - 移除页面结构中的 FAQ 区域描述（CLAUDE.md）
  - 移除 FAQ 测试清单（docs/TESTING.md）
  - 移除 FAQ 样式（public/css/styles.css，约 58 行）
  - 移除 FAQ 交互逻辑（public/js/script.js，initFaqAccordion 函数及调用）

### 待完成

- 真实学员案例（照片 + 详细信息）
- 表单后端 API 集成
- Google Analytics / 百度统计集成
- 在线客服集成（如美洽、智齿）
- SEO 优化（结构化数据、sitemap.xml）

## [1.1.0] - 2026-02-01

### 新增

- 技能提升页新增认证素材展示区，按 CISP/HCNP/RHCE 分类（public/assets/images/skills / src/html/pages/skills.html）
- 竞赛指导页使用缩略图展示，点击打开对应大图（src/html/pages/contest.html）

### 变更

- contests 素材更新为 WebP 格式，并按 p/l + thumb/full 组织目录结构（public/assets/images/contests）
- 重命名 contests 素材图片为统一英文文件名，便于后续引用与管理

### 优化

- 部署工作流优化：构建产物同步时排除 dist/assets/images，改为从 public/assets/images 单独 rsync，避免同名图片重复传输（.github/workflows/deploy.yml）

### 移除

- 移除 lanqiao-04 相关资源与页面引用

## [1.0.0] - 2026-01-31

### 新增

- 引入 Vite 构建系统 + HTML include 插件，支持 HTML 模块化拆分（vite.config.js / src/html/）
- 新增 `maintainability.css` 作为交互/状态样式覆写层，减少 JS 写行内样式（public/css/maintainability.css）
- Trust 区域新增雇主联盟 Logo 横向无缝滚动（index.html）
- Trust 区域新增高校合作 Logo 横向无缝滚动（扬州大学、南京工业大学等）（index.html）
- Trust 区域资质认证调整为横向无缝滚动展示（index.html）
- Footer 新增真实公众号/抖音二维码图片（assets/images/）
- Contact CTA 区域新增真实微信/QQ 二维码图片（assets/images/）
- 新增 6 个服务详情页（实习辅导、技能提升、校招冲刺、考研复试、竞赛指导、资源圈子）（services/*.html）
- 新增本地短路径预览脚本（scripts/preview-pretty.sh）

### 变更

- 将 css/js/assets 迁移至 Vite 标准 public/ 目录（public/*）
- 将 6 个服务详情页迁移至 services/ 目录，保持根目录整洁（services/*.html）
- 将 services 子页面改为目录式入口（services/<slug>/index.html），实现更优雅的访问路径
- 前台访问路径改为 /<slug>/ 形式（如 /skills/），由服务端重写
- 部署工作流改为 Vite 构建后同步 dist/ 目录（.github/workflows/deploy.yml）

### 优化

- 重构 JavaScript 为模块化初始化与空节点保护（public/js/script.js）
- 修复 services 子页面静态资源相对路径问题，改为绝对路径（/css、/assets）
- 修复 Trust 区域「升学率」图标字符异常（src/html/sections/trust.html）

### 移除

- 撤销 Header 导航「旗下站点」下拉菜单，恢复为锚点跳转（index.html）
- Footer 移除「陪跑服务」「关于我们」两列，保留核心链接信息（index.html）

### 样式调整

- Footer 区域取消单行省略号策略，缩小列表字体以减少换行（public/css/styles.css）
- Footer 区域调整字体与布局，减少换行显示并提升信息可读性（public/css/styles.css）

---

## 变更类型说明

- `新增`：新增功能
- `变更`：现有功能的变更
- `废弃`：即将移除的功能
- `移除`：已移除的功能
- `修复`：bug 修复
- `优化`：性能或体验优化
- `安全`：安全相关修复

---

**维护说明**：
- 每次发布新版本时，将 `[Unreleased]` 下的内容移动到对应版本号下
- 版本号格式：`[主版本号.次版本号.修订号] - YYYY-MM-DD`
- 按时间倒序排列（最新版本在最上面）
