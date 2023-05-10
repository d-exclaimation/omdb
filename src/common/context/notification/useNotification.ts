import { useContext } from "react";
import { GlobalContext } from "../global/GlobalContext";

export function useNotifcation() {
  const { notification } = useContext(GlobalContext);
  return notification;
}
