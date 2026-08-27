import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import './FlightTodo.css';

function FlightTodoApp() {
  // 移动端下让卡片全屏贴边展示
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className={`flight-todo-app ${isMobile ? 'mobile' : ''}`}>
      <Todo />
    </div>
  );
}

export default FlightTodoApp;
