import { useCallback, useState } from "react";
import { type Notification } from "./NotificationContext";

export function useNotificationProvider() {
  const [notifications, setNotifications] = useState([] as Notification[]);

  const notify = useCallback(
    (notification: Omit<Notification, "date">) =>
      setNotifications((notifications) => [
        ...notifications,
        { ...notification, date: new Date() },
      ]),
    [setNotifications]
  );

  const remove = useCallback(
    (timestamp: Date) =>
      setNotifications((notifications) =>
        notifications.filter((n) => n.date !== timestamp)
      ),
    [setNotifications]
  );

  return { notifications, notify, remove };
}

export function prettyDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
