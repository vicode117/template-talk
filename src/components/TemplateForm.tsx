import { useState, useEffect, useRef, useCallback } from 'react';
import type { Template } from '@/types';

interface TemplateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  editTemplate?: Template | null;
  initialContent?: { title: string; content: string } | null;
}

interface Variable {
  name: string;
  suggested: boolean;
}

// 获取光标位置相对于视口的坐标
function getCaretCoordinates(element: HTMLTextAreaElement, position: number): { top: number; left: number; bottom: number } | null {
  const div = document.createElement('div');
  const computedStyle = window.getComputedStyle(element);

  // 复制 textarea 的样式
  const properties = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'letterSpacing',
    'wordSpacing',
  ];

  for (const prop of properties) {
    div.style.setProperty(prop, computedStyle.getPropertyValue(prop));
  }

  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';
  div.style.wordWrap = 'break-word';

  // 设置文本内容到光标位置
  const text = element.value.substring(0, position);
  const trailing = element.value.substring(position, position + 1) || ' ';
  div.textContent = text + trailing;

  const span = document.createElement('span');
  span.textContent = trailing;
  div.appendChild(span);

  document.body.appendChild(div);
  const coords = {
    top: div.offsetTop + span.offsetTop + element.offsetTop,
    left: div.offsetLeft + span.offsetLeft + element.offsetLeft,
    bottom: div.offsetTop + span.offsetTop + element.offsetTop + span.offsetHeight,
  };
  document.body.removeChild(div);

  return coords;
}

export function TemplateForm({ isOpen, onClose, onSave, editTemplate, initialContent }: TemplateFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showVariablePanel, setShowVariablePanel] = useState(false);
  const [variableSearch, setVariableSearch] = useState('');
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const variablesRef = useRef<HTMLDivElement>(null);

  // 从现有内容提取变量
  const extractVariables = useCallback((text: string): Variable[] => {
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const matches = [...text.matchAll(regex)];
    const vars = new Map<string, boolean>();

    matches.forEach(([, name]) => {
      vars.set(name, true);
    });

    return Array.from(vars.keys()).map((name) => ({
      name,
      suggested: false,
    }));
  }, []);

  // 所有变量（已使用 + 常用）
  const allVariables = [
    ...extractVariables(content),
    { name: 'name', suggested: true },
    { name: 'time', suggested: true },
    { name: 'date', suggested: true },
    { name: 'event', suggested: true },
    { name: 'location', suggested: true },
    { name: 'title', suggested: true },
  ];

  // 去重
  const uniqueVariables = allVariables.filter(
    (v, i, arr) => arr.findIndex((x) => x.name === v.name) === i
  );

  // 过滤变量
  const filteredVariables = uniqueVariables.filter((v) =>
    v.name.toLowerCase().includes(variableSearch.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      if (editTemplate) {
        setTitle(editTemplate.title);
        setContent(editTemplate.content);
      } else if (initialContent) {
        setTitle(initialContent.title);
        setContent(initialContent.content);
      } else {
        setTitle('');
        setContent('');
      }
    }
  }, [isOpen, editTemplate, initialContent]);

  // 检测 @ 输入并计算面板位置
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const selectionStart = e.target.selectionStart;
    const beforeCaret = value.slice(0, selectionStart);
    const atMatch = beforeCaret.match(/@(\w*)$/);

    if (atMatch) {
      setVariableSearch(atMatch[1]);
      setShowVariablePanel(true);

      // 计算光标位置
      const textarea = textareaRef.current;
      if (textarea) {
        const coords = getCaretCoordinates(textarea, selectionStart);
        if (coords) {
          // 面板尺寸
          const panelWidth = 220;
          const panelHeight = 200;
          const margin = 10;

          // 获取视口信息
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // 检查右下方是否有足够空间
          const spaceOnRight = viewportWidth - coords.left - margin;
          const spaceOnBottom = viewportHeight - coords.bottom - margin;

          const hasSpaceOnRight = spaceOnRight >= panelWidth;
          const hasSpaceOnBottom = spaceOnBottom >= panelHeight;

          let top: number;
          let left: number;

          if (hasSpaceOnRight && hasSpaceOnBottom) {
            // 右下方空间足够，显示在右下方
            top = coords.bottom + margin;
            left = coords.left + margin;
          } else {
            // 空间不足，显示在左上方
            top = coords.top - panelHeight - margin;
            left = coords.left - panelWidth - margin;
          }

          // 确保不超出视口边界
          if (top < margin) top = margin;
          if (left < margin) left = margin;
          if (top + panelHeight > viewportHeight - margin) {
            top = viewportHeight - panelHeight - margin;
          }
          if (left + panelWidth > viewportWidth - margin) {
            left = viewportWidth - panelWidth - margin;
          }

          setPanelPosition({ top, left });
        }
      }
    } else {
      setShowVariablePanel(false);
    }

    setContent(value);
  };

  // 插入变量
  const insertVariable = (varName: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const beforeCaret = content.slice(0, selectionStart);
    const afterCaret = content.slice(selectionStart);

    // 找到 @ 的位置
    const atIndex = beforeCaret.lastIndexOf('@');

    // 移除 @ 及其后面的搜索文本，插入 {{变量名}}
    const newContent =
      beforeCaret.slice(0, atIndex) + `{{${varName}}}` + afterCaret;

    setContent(newContent);
    setShowVariablePanel(false);

    // 设置光标位置
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = atIndex + varName.length + 4; // {{ 和 }} 共4个字符
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // 添加新变量
  const addNewVariable = () => {
    if (variableSearch.trim()) {
      insertVariable(variableSearch.trim());
    }
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showVariablePanel) {
      if (e.key === 'Escape') {
        setShowVariablePanel(false);
        return;
      }
    }

    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSave(title.trim(), content.trim());
    onClose();
  };

  // 点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        variablesRef.current &&
        !variablesRef.current.contains(e.target as Node) &&
        !textareaRef.current?.contains(e.target as Node)
      ) {
        setShowVariablePanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {editTemplate ? '编辑模板' : '新增模板'}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请输入模板标题"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              模板内容
              <span className="ml-2 text-xs text-gray-400 font-normal">
                输入 @ 选择或创建变量
              </span>
            </label>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="例如：你好 {{name}}，请于 {{time}} 参加会议&#10;输入 @ 插入变量"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
              style={{
                backgroundImage: `linear-gradient(transparent ${content ? 'calc(100% - 1px)' : '100%'}, transparent calc(100% - 1px), #fef3c7 calc(100% - 1px), #fef3c7 100%)`,
                backgroundSize: '100% 24px',
              }}
            />

            {/* 变量选择面板 - 使用 fixed 定位 */}
            {showVariablePanel && panelPosition && (
              <div
                ref={variablesRef}
                className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto"
                style={{
                  top: panelPosition.top,
                  left: panelPosition.left,
                  width: '220px',
                }}
              >
                {/* 新建变量选项 */}
                {variableSearch && !filteredVariables.find((v) => v.name === variableSearch) && (
                  <button
                    onClick={addNewVariable}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2"
                  >
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
                      +
                    </span>
                    <span>创建 &quot;{variableSearch}&quot;</span>
                  </button>
                )}

                {/* 已有变量列表 */}
                {filteredVariables.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => insertVariable(v.name)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-blue-50 flex items-center gap-2"
                  >
                    <span className="w-5 h-5 bg-yellow-100 text-yellow-600 rounded flex items-center justify-center text-xs font-mono">
                      {v.suggested ? '预设' : '变量'}
                    </span>
                    <span className="font-medium text-gray-800">{v.name}</span>
                  </button>
                ))}

                {filteredVariables.length === 0 && !variableSearch && (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    输入变量名创建新变量
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 变量预览提示 */}
          {content.includes('{{') && (
            <div className="text-xs text-gray-500 bg-gray-50 rounded px-3 py-2">
              检测到 {extractVariables(content).length} 个变量：{' '}
              {extractVariables(content).map((v) => (
                <span
                  key={v.name}
                  className="inline-block bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded mx-0.5"
                >
                  {v.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
