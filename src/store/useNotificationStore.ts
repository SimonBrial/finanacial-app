import { create } from "zustand";
import dayjs from "dayjs";
import Toast from "react-native-toast-message";

export interface NotificationToastData {
  id: string;
  type: "success" | "warning" | "danger" | "info";
  title: string;
  description: string;
  timestamp: string;
}

interface NotificationStore {
  notifications: NotificationToastData[];
  showNotification: (notification: Omit<NotificationToastData, "id" | "timestamp">) => void;
  hideNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  showNotification: (notification) => {
    const id = Math.random().toString();
    const timestamp = dayjs().format("DD/MM/YYYY - hh:mm A");
    const newNotif = { ...notification, id, timestamp };
    
    set((state) => ({ notifications: [...state.notifications, newNotif] }));

    // Show the react-native-toast-message notification
    // Map "danger" status type to react-native-toast-message's default "error" type
    const toastType = notification.type === "danger" ? "error" : notification.type;

    Toast.show({
      type: toastType,
      text1: notification.title,
      text2: notification.description,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
    });
  },
  hideNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

