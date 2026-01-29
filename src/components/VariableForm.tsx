import { useState } from 'react';

interface VariableFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (values: Record<string, string>) => void;
  variables: string[];
}

export function VariableForm({ isOpen, onClose, onConfirm, variables }: VariableFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    variables.reduce((acc, v) => ({ ...acc, [v]: '' }), {})
  );

  if (!isOpen) return null;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onConfirm(values);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">填写变量</h2>
          <p className="text-sm text-gray-500 mt-1">未填写的变量将使用空字符串</p>
        </div>

        <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
          {variables.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              模板中未定义变量，点击确认直接生成
            </p>
          ) : (
            variables.map((name) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {name}
                </label>
                <input
                  type="text"
                  value={values[name] || ''}
                  onChange={(e) => handleChange(name, e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`请输入 ${name}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus={name === variables[0]}
                />
              </div>
            ))
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
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            确认生成
          </button>
        </div>
      </div>
    </div>
  );
}
