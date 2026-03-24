import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  bgColor: string;
}

const apps: AppItem[] = [
  {
    id: 'template-talk',
    name: '模板话术',
    path: '/template-talk',
    bgColor: 'bg-gradient-to-br from-green-400 to-emerald-600',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'calendar',
    name: '日历',
    path: '/calendar',
    bgColor: 'bg-gradient-to-br from-red-400 to-rose-600',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'hospital-bag',
    name: '待产清单',
    path: '/hospital-bag',
    bgColor: 'bg-gradient-to-br from-pink-400 to-rose-500',
    icon: (
      <span className="text-3xl">🍼</span>
    ),
  },
];

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="text-center text-white pt-14 pb-8 select-none">
      <div className="text-7xl font-extralight tracking-wider tabular-nums">
        {hours}:{minutes}
      </div>
      <div className="text-lg font-light mt-1 opacity-90">{dateStr}</div>
    </div>
  );
}

function AppIcon({ app, onTap }: { app: AppItem; onTap: (app: AppItem) => void }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={() => onTap(app)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className="flex flex-col items-center gap-2 group"
    >
      <div
        className={`w-16 h-16 rounded-[18px] ${app.bgColor} flex items-center justify-center shadow-lg transition-transform duration-150 ${
          pressed ? 'scale-90' : 'group-hover:scale-105'
        }`}
      >
        {app.icon}
      </div>
      <span className="text-xs text-white font-medium drop-shadow-md">
        {app.name}
      </span>
    </button>
  );
}

export function HomeScreen() {
  const navigate = useNavigate();

  const handleTap = (app: AppItem) => {
    navigate(app.path);
  };

  return (
    <div className="homescreen-wallpaper min-h-screen flex flex-col relative overflow-hidden">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 text-white/80 text-xs font-medium select-none">
        <span>Rose's Toolbox</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
          </svg>
        </div>
      </div>

      {/* Clock */}
      <Clock />

      {/* App grid */}
      <div className="flex-1 flex items-start justify-center px-8 pt-4">
        <div className="grid grid-cols-4 gap-x-8 gap-y-6">
          {apps.map((app) => (
            <AppIcon key={app.id} app={app} onTap={handleTap} />
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="pb-6 px-6 pt-3">
        <div className="mx-auto max-w-xs h-20 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center">
          <span className="text-white/50 text-sm font-light select-none">Rose's Toolbox</span>
        </div>
      </div>
    </div>
  );
}
