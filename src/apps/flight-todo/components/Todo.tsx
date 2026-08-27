import { useState, useEffect } from 'react';
import type { FlightTodoItem } from '@/types';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

interface Translation {
  zh: string;
  en: string;
}

interface CategoryTranslation {
  zh: string[];
  en: string[];
}

interface Translations {
  title: Translation;
  switchLanguage: Translation;
  all: Translation;
  completed: Translation;
  incomplete: Translation;
  categories: CategoryTranslation;
  [key: string]: Translation | CategoryTranslation;
}

// 翻译对象
const translations: Translations = {
  title: {
    zh: '飞行准备清单',
    en: 'Flight Preparation Checklist'
  },
  categories: {
    zh: [
      '文件准备',
      '行李打包',
      '电子设备',
      '健康准备',
      '旅行安排',
      '其他'
    ],
    en: [
      'Documents',
      'Luggage',
      'Electronics',
      'Health',
      'Travel',
      'Others'
    ]
  },
  all: {
    zh: '全部',
    en: 'All'
  },
  completed: {
    zh: '已完成',
    en: 'Completed'
  },
  incomplete: {
    zh: '未完成',
    en: 'Incomplete'
  },
  switchLanguage: {
    zh: 'English',
    en: '中文'
  }
};

const Todo: React.FC = () => {
  const [language, setLanguage] = useState<'zh' | 'en'>('en');
  const [todos, setTodos] = useState<FlightTodoItem[]>(() => {
    // 从本地存储加载数据
    const savedTodos = localStorage.getItem('flightTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 保存到本地存储
  useEffect(() => {
    localStorage.setItem('flightTodos', JSON.stringify(todos));
  }, [todos]);

  // 添加新任务
  const addTodo = (text: string, category: string) => {
    if (text.trim() === '') return;

    const newTodo: FlightTodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      category
    };

    setTodos([...todos, newTodo]);
  };

  // 完成/取消完成任务
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 删除任务
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 获取各类别的任务数量
  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    todos.forEach(todo => {
      counts[todo.category] = (counts[todo.category] || 0) + 1;
    });
    return counts;
  };

  // 切换语言
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  // 获取当前语言的类别
  const categories = translations.categories[language];

  return (
    <div className="todo-container">
      <div className="header-container">
        <h1>{translations.title[language]}</h1>
        <button
          onClick={toggleLanguage}
          className="language-toggle"
        >
          {translations.switchLanguage[language]}
        </button>
      </div>

      <TodoForm
        addTodo={addTodo}
        categories={categories}
        language={language}
      />

      <div className="category-summary">
        {Object.entries(getCategoryCounts()).map(([category, count]) => (
          <div key={category} className="category-badge">
            {category}: {count}
          </div>
        ))}
      </div>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        categories={categories}
        language={language}
        translations={translations}
      />
    </div>
  );
};

export default Todo;
