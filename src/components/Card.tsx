import type { Template } from '@/types';

interface CardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
  onDuplicate: (template: Template) => void;
  onGenerate: (template: Template) => void;
}

export function Card({ template, onEdit, onDelete, onDuplicate, onGenerate }: CardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {template.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 whitespace-pre-wrap">
          {template.content}
        </p>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
        <span className="text-xs text-gray-400">
          更新于 {formatDate(template.updatedAt)}
        </span>

        <div className="flex gap-1">
          {/* 生成按钮 - 高频使用，醒目显示，带文字 */}
          <button
            onClick={() => onGenerate(template)}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            title="生成话术"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>生成</span>
          </button>

          {/* 低频操作 - 只显示图标 */}
          <button
            onClick={() => onDuplicate(template)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="复制创建"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(template)}
            className="p-1.5 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
            title="编辑"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(template.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="删除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
