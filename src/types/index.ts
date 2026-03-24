export interface Template {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface Variable {
  name: string;
  value: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChecklistItem {
  id: string;
  name: string;
  note: string;
  checked: boolean;
  isCustom?: boolean;
}

export interface ChecklistCategory {
  id: string;
  icon: string;
  title: string;
  color: string;
  items: ChecklistItem[];
}
