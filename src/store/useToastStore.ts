import { create } from 'zustand';

type ToastState = {
  isToastVisible: boolean;
  showToast: () => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  isToastVisible: false,
  showToast: () => set({ isToastVisible: true }),
  hideToast: () => set({ isToastVisible: false }),
}));
