import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Template } from '@/types';
import { Card } from './components/Card';
import { AddButton } from './components/AddButton';
import { TemplateForm } from './components/TemplateForm';
import { VariableForm } from './components/VariableForm';
import { ToastComponent, useToast } from '@/components/Toast';
import { extractVariables, replaceVariables } from './utils/variables';
import { getAllTemplates, saveTemplate, deleteTemplate, getTemplatesCount } from './hooks/useTemplates';

const DEFAULT_TEMPLATE: Template = {
  id: 'default-1',
  title: '会议邀请',
  content: '你好 {{name}}，请于 {{time}} 参加 {{event}} 会议。',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export default function TemplateTalkApp() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVariableFormOpen, setIsVariableFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [generatingTemplate, setGeneratingTemplate] = useState<Template | null>(null);
  const [initialContent, setInitialContent] = useState<{ title: string; content: string } | null>(null);
  const { toasts, showToast, closeToast } = useToast();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const count = await getTemplatesCount();
    if (count === 0) {
      await saveTemplate(DEFAULT_TEMPLATE);
    }
    const allTemplates = await getAllTemplates();
    setTemplates(allTemplates.reverse());
  };

  const handleAddClick = () => {
    setInitialContent(null);
    setEditingTemplate(null);
    setIsFormOpen(true);
  };

  const handleEdit = (template: Template) => {
    setInitialContent(null);
    setEditingTemplate(template);
    setIsFormOpen(true);
  };

  const handleSave = async (title: string, content: string) => {
    const now = Date.now();

    if (editingTemplate) {
      const updated: Template = {
        ...editingTemplate,
        title,
        content,
        updatedAt: now,
      };
      await saveTemplate(updated);
      setTemplates((prev) =>
        prev.map((t) => (t.id === editingTemplate.id ? updated : t))
      );
    } else {
      const newTemplate: Template = {
        id: crypto.randomUUID(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      await saveTemplate(newTemplate);
      setTemplates((prev) => [newTemplate, ...prev]);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这个模板吗？')) {
      await deleteTemplate(id);
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      showToast('模板已删除', 'info');
    }
  };

  const handleDuplicate = (template: Template) => {
    setInitialContent({ title: template.title, content: template.content });
    setEditingTemplate(null);
    setIsFormOpen(true);
  };

  const handleGenerate = (template: Template) => {
    setGeneratingTemplate(template);
    setIsVariableFormOpen(true);
  };

  const handleConfirmGenerate = async (values: Record<string, string>) => {
    if (!generatingTemplate) return;

    const result = replaceVariables(generatingTemplate.content, values);

    try {
      await navigator.clipboard.writeText(result);
      showToast('已成功生成话术并写入剪贴板', 'success');
    } catch {
      showToast('生成失败，请重试', 'error');
    }
  };

  const getVariables = (content: string) => {
    return extractVariables(content);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
            title="返回主屏幕"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">模板话术</h1>
            <p className="text-sm text-gray-500 mt-1">管理你的模板话术，快速生成并复制</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <AddButton onClick={handleAddClick} />

          {templates.map((template) => (
            <Card
              key={template.id}
              template={template}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onGenerate={handleGenerate}
            />
          ))}
        </div>
      </main>

      <TemplateForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setInitialContent(null);
        }}
        onSave={handleSave}
        editTemplate={editingTemplate}
        initialContent={initialContent}
      />

      {generatingTemplate && (
        <VariableForm
          isOpen={isVariableFormOpen}
          onClose={() => setIsVariableFormOpen(false)}
          onConfirm={handleConfirmGenerate}
          variables={getVariables(generatingTemplate.content)}
        />
      )}

      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onClose={() => closeToast(toast.id)}
        />
      ))}
    </div>
  );
}
