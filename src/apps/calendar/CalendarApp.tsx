import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CalendarEvent } from '@/types';
import { ToastComponent, useToast } from '@/components/Toast';
import { MonthView } from './components/MonthView';
import { DayDetail } from './components/DayDetail';
import { EventForm } from './components/EventForm';
import { getAllEvents, saveEvent, deleteEvent } from './hooks/useCalendarEvents';

const WEEKDAY_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function formatDateChinese(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}年${m}月${d}日`;
}

function formatDateWithWeekday(date: Date): string {
  return `${formatDateChinese(date)} ${WEEKDAY_NAMES[date.getDay()]}`;
}

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function CalendarApp() {
  const navigate = useNavigate();
  const { toasts, showToast, closeToast } = useToast();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [jumpDays, setJumpDays] = useState('');

  const loadEvents = useCallback(async () => {
    const all = await getAllEvents();
    setEvents(all);
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('确定要删除这个日程吗？')) {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast('日程已删除', 'info');
    }
  };

  const handleSaveEvent = async (
    data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const now = Date.now();

    if (editingEvent) {
      const updated: CalendarEvent = {
        ...editingEvent,
        ...data,
        updatedAt: now,
      };
      await saveEvent(updated);
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? updated : e)));
      showToast('日程已更新', 'success');
    } else {
      const newEvent: CalendarEvent = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      await saveEvent(newEvent);
      setEvents((prev) => [...prev, newEvent]);
      showToast('日程已创建', 'success');
    }
  };

  const handleJumpDays = async () => {
    const days = parseInt(jumpDays, 10);
    if (isNaN(days)) {
      showToast('请输入有效的天数', 'error');
      return;
    }

    const baseDate = selectedDate ? new Date(selectedDate) : new Date();
    const targetDate = new Date(baseDate);
    targetDate.setDate(targetDate.getDate() + days);

    const targetStr = toDateString(targetDate);
    const targetFull = formatDateWithWeekday(targetDate);
    const baseChinese = formatDateChinese(baseDate);

    setCurrentYear(targetDate.getFullYear());
    setCurrentMonth(targetDate.getMonth());
    setSelectedDate(targetStr);

    try {
      await navigator.clipboard.writeText(targetFull);
      showToast(`${baseChinese}的${days}天后为 ${targetFull}（已复制）`, 'success');
    } catch {
      showToast(`${baseChinese}的${days}天后为 ${targetFull}`, 'info');
    }

    setJumpDays('');
  };

  const selectedDayEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

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
            <h1 className="text-2xl font-bold text-gray-800">日历</h1>
            <p className="text-sm text-gray-500 mt-1">管理你的日程安排</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4">
        {/* Jump days input */}
        <div className="mb-4 bg-white rounded-2xl shadow-md p-4 flex items-center gap-3">
          <span className="text-sm text-gray-500 shrink-0">
            {selectedDate
              ? `${formatDateChinese(new Date(selectedDate))} +`
              : '今天 +'}
          </span>
          <input
            type="number"
            value={jumpDays}
            onChange={(e) => setJumpDays(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJumpDays()}
            placeholder="输入天数"
            className="flex-1 min-w-0 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={handleJumpDays}
            className="shrink-0 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
          >
            跳转
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-5">
            <MonthView
              year={currentYear}
              month={currentMonth}
              events={events}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onYearMonthChange={(y, m) => {
                setCurrentYear(y);
                setCurrentMonth(m);
              }}
            />
          </div>

          {/* Day detail panel */}
          <div className="lg:col-span-2">
            {selectedDate ? (
              <DayDetail
                date={selectedDate}
                events={selectedDayEvents}
                onAddEvent={handleAddEvent}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">选择一个日期查看日程</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <EventForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        editEvent={editingEvent}
        defaultDate={selectedDate || undefined}
      />

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
