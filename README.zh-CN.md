# Rose's Toolbox

中文 | [English](./README.md)

一个仿 iPhone 桌面风格的个人多应用工具箱。所有数据存储在本地 IndexedDB 中，无需后端服务。

## 功能介绍

### 主屏幕

仿 iPhone 桌面的应用启动器，包含动态渐变壁纸、实时时钟、应用图标网格和磨砂玻璃效果的 Dock 栏。

### 模板话术

创建和管理可复用的文本模板，支持动态变量替换。

- 新增、编辑、复制、删除模板
- 输入 `@` 触发变量选择器（如 `{{name}}`、`{{time}}`）
- 一键填写变量并生成最终话术
- 生成结果自动复制到剪贴板

### 日历

月视图日历，支持日程管理。

- 月历网格视图，带日程圆点指示
- 前后月份导航
- 新建、编辑、删除日程
- 日程属性：标题、日期、时间范围、描述、颜色标签
- 选中日期后展示当日所有日程

## 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | React 19 |
| 语言 | TypeScript 5.9 |
| 构建工具 | Vite 7 |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router 7 |
| 存储 | IndexedDB（通过 idb） |
| 代码检查 | ESLint 9 |
| 包管理器 | pnpm |

## 项目结构

```
src/
  main.tsx                        # 入口文件，BrowserRouter 配置
  App.tsx                         # 路由定义
  index.css                       # 全局样式
  types/index.ts                  # 共享类型定义
  components/
    HomeScreen.tsx                # iPhone 风格主屏幕
    Toast.tsx                     # 共享 Toast 提示组件
  apps/
    template-talk/
      TemplateTalkApp.tsx         # 模板话术主页面
      components/                 # AddButton、Card、TemplateForm、VariableForm
      hooks/useTemplates.ts       # IndexedDB 模板增删改查
      utils/variables.ts          # 变量提取与替换
    calendar/
      CalendarApp.tsx             # 日历主页面
      components/                 # MonthView、DayDetail、EventForm
      hooks/useCalendarEvents.ts  # IndexedDB 日程增删改查
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm

### 安装与运行

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产环境构建
pnpm build

# 预览生产构建
pnpm preview
```

### 使用方式

1. 在浏览器中打开应用（默认地址：`http://localhost:5173`）
2. 主屏幕以图标形式展示所有可用应用
3. 点击 **模板话术** 管理文本模板
4. 点击 **日历** 管理日程安排
5. 在各应用内点击返回按钮回到主屏幕

## 许可证

MIT
