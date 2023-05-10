export type Notification = {
  title: string;
  date: Date;
  kind: "info" | "warning" | "error" | "success";
};

export type NotificationContext = {
  notifications: Notification[];
  notify: (arg: Omit<Notification, "date">) => void;
};

export const initialNotificationContext = {
  notifications: [],
  notify: () => {},
} as NotificationContext;
