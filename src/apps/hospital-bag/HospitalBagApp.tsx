import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChecklistItem, ChecklistCategory } from '@/types';
import { ToastComponent, useToast } from '@/components/Toast';

const STORAGE_KEY = 'hospital-bag-checklist';

const DEFAULT_CATEGORIES: Omit<ChecklistCategory, 'items'> & {
  items: Omit<ChecklistItem, 'id' | 'checked'>[];
}[] = [
  {
    id: 'docs',
    icon: '📋',
    title: '证件类',
    color: 'from-blue-400 to-blue-600',
    items: [
      { name: '身份证', note: '双方' },
      { name: '医保卡', note: '' },
      { name: '产检手册', note: '' },
      { name: '生育登记证明', note: '' },
    ],
  },
  {
    id: 'mom-clothes',
    icon: '👩',
    title: '妈妈衣物',
    color: 'from-pink-400 to-rose-500',
    items: [
      { name: '哺乳内衣', note: '2-3件' },
      { name: '月子服/宽松睡衣', note: '2套' },
      { name: '一次性内裤', note: '多条' },
      { name: '袜子', note: '' },
      { name: '拖鞋', note: '' },
      { name: '出院衣服', note: '' },
    ],
  },
  {
    id: 'mom-care',
    icon: '🧴',
    title: '妈妈护理',
    color: 'from-rose-400 to-pink-600',
    items: [
      { name: '产褥垫', note: '1-2包' },
      { name: '卫生巾/安心裤', note: '' },
      { name: '一次性马桶垫', note: '' },
      { name: '吸管杯', note: '' },
      { name: '洗漱用品', note: '' },
      { name: '毛巾', note: '' },
      { name: '吸奶器', note: '可选' },
    ],
  },
  {
    id: 'baby-clothes',
    icon: '👶',
    title: '宝宝衣物',
    color: 'from-orange-400 to-amber-500',
    items: [
      { name: '新生儿衣服', note: '3-4套' },
      { name: '婴儿帽子', note: '' },
      { name: '婴儿袜子', note: '' },
      { name: '包被', note: '' },
      { name: '毯子', note: '' },
    ],
  },
  {
    id: 'baby-care',
    icon: '🧷',
    title: '宝宝护理',
    color: 'from-green-400 to-emerald-600',
    items: [
      { name: '纸尿裤 (NB码)', note: '' },
      { name: '婴儿湿巾', note: '' },
      { name: '棉柔巾', note: '' },
      { name: '护臀膏', note: '' },
    ],
  },
  {
    id: 'feeding',
    icon: '🍼',
    title: '喂养用品',
    color: 'from-purple-400 to-violet-600',
    items: [
      { name: '奶瓶', note: '' },
      { name: '奶粉', note: '备用' },
      { name: '吸奶器', note: '可选' },
    ],
  },
  {
    id: 'energy',
    icon: '🍫',
    title: '能量补给',
    color: 'from-amber-600 to-yellow-700',
    items: [
      { name: '红糖', note: '' },
      { name: '巧克力', note: '顺产补充体力' },
      { name: '功能饮料', note: '可选' },
    ],
  },
  {
    id: 'custom',
    icon: '➕',
    title: '自定义',
    color: 'from-slate-400 to-gray-600',
    items: [],
  },
];

function initData(): ChecklistCategory[] {
  return DEFAULT_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.map((item, i) => ({
      ...item,
      id: `${cat.id}-${i}`,
      checked: false,
    })),
  }));
}

function loadData(): ChecklistCategory[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return initData();
}

function saveData(data: ChecklistCategory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const GRID_IMAGES = [
  { src: '/images/hospital-bag/1.png', label: '妈妈衣物' },
  { src: '/images/hospital-bag/2.png', label: '证件' },
  { src: '/images/hospital-bag/3.png', label: '宝宝衣物' },
  { src: '/images/hospital-bag/4.png', label: '妈妈护理' },
  { src: '/images/hospital-bag/5.png', label: '宝宝护理' },
  { src: '/images/hospital-bag/6.png', label: '包被毯子' },
  { src: '/images/hospital-bag/7.png', label: '能量补给' },
  { src: '/images/hospital-bag/8.png', label: '吸奶器' },
  { src: '/images/hospital-bag/9.png', label: '奶瓶奶粉' },
];

export default function HospitalBagApp() {
  const navigate = useNavigate();
  const { toasts, showToast, closeToast } = useToast();
  const [categories, setCategories] = useState<ChecklistCategory[]>(loadData);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [showGrid, setShowGrid] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');

  // Auto-open all categories on first load
  useEffect(() => {
    const allOpen: Record<string, boolean> = {};
    categories.forEach((c) => (allOpen[c.id] = true));
    setOpenCats(allOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleItem = useCallback(
    (catId: string, itemId: string) => {
      setCategories((prev) => {
        const next = prev.map((cat) =>
          cat.id === catId
            ? {
                ...cat,
                items: cat.items.map((item) =>
                  item.id === itemId ? { ...item, checked: !item.checked } : item
                ),
              }
            : cat
        );
        saveData(next);
        return next;
      });
    },
    []
  );

  const toggleCategory = useCallback((catId: string) => {
    setOpenCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  }, []);

  const addCustomItem = useCallback(() => {
    const name = newItemText.trim();
    if (!name) return;
    setCategories((prev) => {
      const next = prev.map((cat) =>
        cat.id === 'custom'
          ? {
              ...cat,
              items: [
                ...cat.items,
                { id: `custom-${Date.now()}`, name, note: '', checked: false, isCustom: true },
              ],
            }
          : cat
      );
      saveData(next);
      return next;
    });
    setNewItemText('');
    showToast('已添加', 'success');
  }, [newItemText, showToast]);

  const deleteCustomItem = useCallback(
    (itemId: string) => {
      setCategories((prev) => {
        const next = prev.map((cat) =>
          cat.id === 'custom'
            ? { ...cat, items: cat.items.filter((item) => item.id !== itemId) }
            : cat
        );
        saveData(next);
        return next;
      });
      showToast('已删除', 'info');
    },
    [showToast]
  );

  const resetAll = useCallback(() => {
    if (!confirm('确定要重置所有进度吗？')) return;
    const fresh = initData();
    setCategories(fresh);
    saveData(fresh);
    showToast('已重置', 'info');
  }, [showToast]);

  // Progress
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.checked).length,
    0
  );
  const pct = totalItems ? Math.round((checkedItems / totalItems) * 100) : 0;

  const subtitle =
    pct === 100
      ? '🎉 全部准备就绪！'
      : pct > 70
        ? '💪 快完成了，加油！'
        : pct > 30
          ? '📦 进展不错，继续准备！'
          : '准备好迎接小宝贝！';

  return (
    <div className="min-h-screen bg-pink-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-pink-400 via-rose-400 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}
          />
        </div>
        <div className="max-w-2xl mx-auto px-4 py-8 text-center relative z-10">
          <button
            onClick={() => navigate('/')}
            className="absolute left-4 top-6 p-2 rounded-lg hover:bg-white/20 transition-colors"
            title="返回主屏幕"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="text-4xl mb-2">🍼</div>
          <h1 className="text-2xl font-bold">待产办事清单</h1>
          <p className="text-sm text-white/90 mt-1">{subtitle}</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 -mt-5 relative z-10">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">准备进度</span>
            <span className="text-xl font-bold text-pink-500">{pct}%</span>
          </div>
          <div className="h-2.5 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>
              已完成 {checkedItems} / {totalItems} 项
            </span>
          </div>
        </div>

        {/* Grid Toggle */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="w-full mb-4 py-3 bg-white rounded-2xl shadow-md text-pink-500 font-semibold text-sm hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          {showGrid ? '收起九宫格参考图' : '查看九宫格参考图'}
        </button>

        {/* Nine Grid */}
        {showGrid && (
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
            <h3 className="text-center text-pink-500 font-semibold mb-3">
              待产包九宫格参考
            </h3>
            <div className="grid grid-cols-3 gap-1.5">
              {GRID_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewImg(img.src)}
                  className="relative rounded-lg overflow-hidden group"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const catChecked = cat.items.filter((i) => i.checked).length;
            const isOpen = openCats[cat.id] ?? false;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <span
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl shadow-sm shrink-0`}
                  >
                    {cat.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800">{cat.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {catChecked}/{cat.items.length} 已完成
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleItem(cat.id, item.id)}
                          className="hidden"
                        />
                        <span
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                            item.checked
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-200'
                          }`}
                        >
                          {item.checked && (
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`flex-1 text-sm transition-all ${
                            item.checked
                              ? 'line-through text-gray-400'
                              : 'text-gray-700'
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.note && (
                          <span className="text-xs text-gray-400 shrink-0">
                            {item.note}
                          </span>
                        )}
                        {item.isCustom && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCustomItem(item.id);
                            }}
                            className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </label>
                    ))}

                    {cat.id === 'custom' && (
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
                          placeholder="添加自定义事项..."
                          className="flex-1 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm outline-none focus:border-pink-400 transition-colors"
                        />
                        <button
                          onClick={addCustomItem}
                          className="w-9 h-9 bg-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-pink-600 transition-colors shrink-0"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* FAB Reset */}
      <button
        onClick={resetAll}
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-500 text-white text-2xl rounded-full shadow-lg hover:bg-pink-600 hover:scale-110 transition-all z-50"
        title="重置清单"
      >
        🔄
      </button>

      {/* Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-5"
          onClick={() => setPreviewImg(null)}
        >
          <button
            onClick={() => setPreviewImg(null)}
            className="absolute top-5 right-5 text-white text-3xl z-50"
          >
            ✕
          </button>
          <img
            src={previewImg}
            alt="预览"
            className="max-w-full max-h-[90vh] rounded-xl"
          />
        </div>
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
