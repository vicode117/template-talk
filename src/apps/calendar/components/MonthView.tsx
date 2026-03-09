import { useState, useRef, useEffect } from 'react';
import type { CalendarEvent } from '@/types';

interface MonthViewProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearMonthChange: (year: number, month: number) => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = Array.from({ length: 12 }, (_, i) => i);

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function YearMonthPicker({
  year,
  month,
  onSelect,
  onClose,
}: {
  year: number;
  month: number;
  onSelect: (y: number, m: number) => void;
  onClose: () => void;
}) {
  const [pickerYear, setPickerYear] = useState(year);
  const [pickerMonth, setPickerMonth] = useState(month);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const currentYear = new Date().getFullYear();
  const yearStart = currentYear - 10;
  const yearEnd = currentYear + 10;

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-72"
    >
      {/* Year selector */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setPickerYear((y) => Math.max(yearStart, y - 1))}
          className="p-1 rounded hover:bg-gray-100 text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-base font-semibold text-gray-800">{pickerYear}年</span>
        <button
          onClick={() => setPickerYear((y) => Math.min(yearEnd, y + 1))}
          className="p-1 rounded hover:bg-gray-100 text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-4 gap-2">
        {MONTHS.map((m) => {
          const isActive = pickerYear === year && m === month;
          const isCurrentMonth =
            pickerYear === currentYear && m === new Date().getMonth();
          return (
            <button
              key={m}
              onClick={() => {
                setPickerMonth(m);
                onSelect(pickerYear, m);
              }}
              className={`py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-500 text-white'
                  : isCurrentMonth
                    ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              {m + 1}月
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-center">
        <button
          onClick={() => onSelect(currentYear, new Date().getMonth())}
          className="text-xs text-blue-500 hover:text-blue-700 font-medium"
        >
          回到今天
        </button>
      </div>
    </div>
  );
}

export function MonthView({
  year,
  month,
  events,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onYearMonthChange,
}: MonthViewProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const existing = eventsByDate.get(event.date) || [];
    existing.push(event);
    eventsByDate.set(event.date, existing);
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="relative">
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-blue-50"
          >
            {monthLabel}
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${pickerOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {pickerOpen && (
            <YearMonthPicker
              year={year}
              month={month}
              onSelect={(y, m) => {
                onYearMonthChange(y, m);
                setPickerOpen(false);
              }}
              onClose={() => setPickerOpen(false)}
            />
          )}
        </div>
        <button
          onClick={onNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="text-center text-xs font-medium text-gray-400 py-2">
            {wd}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateKey = formatDateKey(year, month, day);
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedDate;
          const dayEvents = eventsByDate.get(dateKey) || [];
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={dateKey}
              onClick={() => onSelectDate(dateKey)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-150
                ${isSelected
                  ? 'bg-blue-500 text-white shadow-md'
                  : isToday
                    ? 'bg-blue-50 text-blue-600 font-bold ring-2 ring-blue-300'
                    : 'hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <span className="text-sm">{day}</span>
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/80' : ''}`}
                      style={isSelected ? undefined : { backgroundColor: ev.color }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
