import { useState } from 'react';

interface TodoFormProps {
  addTodo: (text: string, category: string) => void;
  categories: string[];
  language: 'zh' | 'en';
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, categories, language }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, category);
      setText('');
    }
  };

  const placeholderText = language === 'zh' ? "添加飞行准备项目..." : "Add flight preparation item...";
  const buttonText = language === 'zh' ? "添加" : "Add";
  const categoryLabel = language === 'zh' ? "选择类别" : "Select category";

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholderText}
          className="todo-input"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
          aria-label={categoryLabel}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit" className="add-button">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
