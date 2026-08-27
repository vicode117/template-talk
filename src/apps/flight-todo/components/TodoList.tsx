import { useState } from 'react';
import type { FlightTodoItem } from '@/types';
import TodoItem from './TodoItem';

interface Translation {
  zh: string;
  en: string;
}

interface CategoryTranslation {
  zh: string[];
  en: string[];
}

interface Translations {
  all: Translation;
  completed: Translation;
  incomplete: Translation;
  categories: CategoryTranslation;
  [key: string]: Translation | CategoryTranslation;
}

interface TodoListProps {
  todos: FlightTodoItem[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  categories: string[];
  language: 'zh' | 'en';
  translations: Translations;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  categories,
  language,
  translations
}) => {
  const allFilter = translations.all[language];
  const completedFilter = translations.completed[language];
  const incompleteFilter = translations.incomplete[language];

  const [filter, setFilter] = useState<string>(allFilter);

  // 过滤任务列表
  const filteredTodos = filter === allFilter
    ? todos
    : filter === completedFilter
      ? todos.filter(todo => todo.completed)
      : filter === incompleteFilter
        ? todos.filter(todo => !todo.completed)
        : todos.filter(todo => todo.category === filter);

  // 计算完成百分比
  const completedPercentage = todos.length
    ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100)
    : 0;

  const emptyMessage = language === 'zh'
    ? `没有${filter}的准备项目`
    : `No ${filter} preparation items`;

  return (
    <div className="todo-list-container">
      <div className="todo-filters">
        <button
          onClick={() => setFilter(allFilter)}
          className={filter === allFilter ? 'active' : ''}
        >
          {allFilter}
        </button>
        <button
          onClick={() => setFilter(completedFilter)}
          className={filter === completedFilter ? 'active' : ''}
        >
          {completedFilter}
        </button>
        <button
          onClick={() => setFilter(incompleteFilter)}
          className={filter === incompleteFilter ? 'active' : ''}
        >
          {incompleteFilter}
        </button>

        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={filter === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${completedPercentage}%` }}
        >
          {completedPercentage}%
        </div>
      </div>

      <div className="todo-items">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              language={language}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
