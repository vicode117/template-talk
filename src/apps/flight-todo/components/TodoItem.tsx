import type { FlightTodoItem } from '@/types';

interface TodoItemProps {
  todo: FlightTodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  language: 'zh' | 'en';
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, language }) => {
  const checkboxLabel = language === 'zh'
    ? `${todo.completed ? '取消完成' : '标记为已完成'}: ${todo.text}`
    : `${todo.completed ? 'Unmark' : 'Mark'} as completed: ${todo.text}`;

  const deleteLabel = language === 'zh' ? "删除任务" : "Delete task";

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="todo-checkbox"
          aria-label={checkboxLabel}
        />

        <div className="todo-details">
          <span className="todo-text">{todo.text}</span>
          <span className="todo-category">{todo.category}</span>
        </div>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="delete-button"
        aria-label={deleteLabel}
      >
        &times;
      </button>
    </div>
  );
};

export default TodoItem;
