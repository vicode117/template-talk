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
