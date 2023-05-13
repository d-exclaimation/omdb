import { Palette } from "@d-exclaimation/common/tailwind";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState, type FC } from "react";

type NotificationProps = {
  date: Date;
  kind: "info" | "warning" | "error" | "success";
  title: string;
  onRemove: (date: Date) => void;
};

const Notification: FC<NotificationProps> = ({
  date,
  kind,
  title,
  onRemove,
}) => {
  const timeoutRef = useRef<number>();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Toast.Root
      duration={2_000}
      className="bg-white rounded-md shadow-xl md:shadow-md p-4 flex flex-row items-center 
      data-[state=open]:animate-slide-in data-[state=closed]:animate-swipe-out
      data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=end]:animate-swipe-out
      data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => onRemove(date), 110);
        }
      }}
    >
      <div className="flex flex-1 flex-col">
        <Toast.Title className="mb-1 font-bold text-zinc-800 text-sm flex items-center w-full">
          <span className="max-w-full truncate">{title}</span>
        </Toast.Title>
        <Toast.Description asChild>
          <time
            className="m-0 text-zinc-600 text-xs leading-[1.3]"
            dateTime={date.toISOString()}
          >
            {prettyDate(date)}
          </time>
        </Toast.Description>
      </div>
      <div
        className={`inline-flex items-center justify-center rounded font-medium text-xs px-3 py-1 
        ring-1 ${kindStyle(kind).join(" ")}`}
      >
        {kind.charAt(0).toUpperCase() + kind.slice(1)}
      </div>
    </Toast.Root>
  );
};

export function kindStyle(
  kind: NotificationProps["kind"]
): [Palette["bg"], Palette["text"], Palette["ring"]] {
  switch (kind) {
    case "info":
      return ["bg-blue-50", "text-blue-900", "ring-blue-600"];
    case "warning":
      return ["bg-yellow-50", "text-yellow-900", "ring-yellow-600"];
    case "error":
      return ["bg-red-50", "text-red-900", "ring-red-600"];
    case "success":
      return ["bg-green-50", "text-green-900", "ring-green-600"];
  }
}

export function prettyDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export default Notification;
