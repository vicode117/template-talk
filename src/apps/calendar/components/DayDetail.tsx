import type { CalendarEvent } from '@/types';

interface DayDetailProps {
  date: string;
  events: CalendarEvent[];
  onAddEvent: () => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

export function DayDetail({ date, events, onAddEvent, onEditEvent, onDeleteEvent }: DayDetailProps) {
  const sortedEvents = [...events].sort((a, b) => {
    if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
    if (a.startTime) return -1;
    if (b.startTime) return 1;
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{formatDisplayDate(date)}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {events.length === 0 ? '暂无日程' : `${events.length} 个日程`}
          </p>
        </div>
        <button
          onClick={onAddEvent}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
          title="添加日程"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="p-8 text-center text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">点击上方 + 按钮添加日程</p>
        </div>
      ) : (
        <div className="divide-y">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors group"
            >
              <div
                className="w-1 self-stretch rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: event.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate">{event.title}</div>
                {(event.startTime || event.endTime) && (
                  <div className="text-xs text-gray-400 mt-0.5">
                    {event.startTime}{event.endTime ? ` - ${event.endTime}` : ''}
                  </div>
                )}
                {event.description && (
                  <div className="text-sm text-gray-500 mt-1 line-clamp-2">{event.description}</div>
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => onEditEvent(event)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="编辑"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="删除"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
