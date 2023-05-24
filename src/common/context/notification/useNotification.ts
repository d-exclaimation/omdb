import { useContext } from "react";
import { GlobalContext } from "../global/GlobalContext";

export function useNotification() {
  const { notification } = useContext(GlobalContext);
  return notification;
}
