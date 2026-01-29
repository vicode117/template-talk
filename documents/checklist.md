# 项目开发 Checklist

## 阶段一：项目初始化

- [x] 1.1 创建 documents 目录并编写设计文档
- [x] 1.2 使用 pnpm 创建 Vite + React + TypeScript 项目
- [x] 1.3 安装并配置 Tailwind CSS
- [x] 1.4 安装 idb 库（IndexedDB 封装）
- [x] 1.5 配置路径别名（@/）

## 阶段二：类型定义与工具函数

- [x] 2.1 创建类型定义文件 (types/index.ts)
- [x] 2.2 创建变量提取工具函数 (utils/variables.ts)
- [x] 2.3 创建 IndexedDB 操作封装 (hooks/useTemplates.ts)

## 阶段三：基础组件开发

- [x] 3.1 创建 Toast 提示组件
- [x] 3.2 创建模板卡片组件 (Card.tsx)
- [x] 3.3 创建卡片网格布局组件 (CardGrid.tsx)
- [x] 3.4 创建新增按钮组件 (AddButton.tsx)

## 阶段四：对话框组件开发

- [x] 4.1 创建模板编辑/新增对话框 (TemplateForm.tsx)
- [x] 4.2 创建变量填写对话框 (VariableForm.tsx)

## 阶段五：主应用集成

- [x] 5.1 实现 App.tsx 主逻辑
- [x] 5.2 集成 IndexedDB 数据流
- [x] 5.3 实现响应式布局

## 阶段六：测试与优化

- [x] 6.1 测试各种功能（新增、编辑、删除、复制、生成）
- [x] 6.2 测试响应式布局
- [x] 6.3 优化 UI 细节
- [x] 6.4 添加默认示例模板

## 变更日志

### 2024-01-29
- [x] 1.1 创建 documents 目录并编写设计文档
- [x] 1.2 使用 pnpm 创建 Vite + React + TypeScript 项目
- [x] 1.3 安装并配置 Tailwind CSS
- [x] 1.4 安装 idb 库（IndexedDB 封装）
- [x] 1.5 配置路径别名（@/）
- [x] 2.1 创建类型定义文件 (types/index.ts)
- [x] 2.2 创建变量提取工具函数 (utils/variables.ts)
- [x] 2.3 创建 IndexedDB 操作封装 (hooks/useTemplates.ts)
- [x] 3.1 创建 Toast 提示组件
- [x] 3.2 创建模板卡片组件 (Card.tsx)
- [x] 3.3 创建卡片网格布局组件 (CardGrid.tsx)
- [x] 3.4 创建新增按钮组件 (AddButton.tsx)
- [x] 4.1 创建模板编辑/新增对话框 (TemplateForm.tsx)
- [x] 4.2 创建变量填写对话框 (VariableForm.tsx)
- [x] 5.1 实现 App.tsx 主逻辑
- [x] 5.2 集成 IndexedDB 数据流
- [x] 5.3 实现响应式布局
- [x] 6.1-6.4 构建测试通过
