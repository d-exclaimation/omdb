import { type Palette } from "@d-exclaimation/common/tailwind";
import { type FC, type ReactNode } from "react";
import { tw } from "../utils/tailwind";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  color: {
    bg: Palette["bg"];
    text: Palette["text"];
    active: `active:${Palette["bg"]}`;
    hover: `hover:${Palette["bg"]}`;
    border: `focus-visible:${Palette["ring"]}`;
  };
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({
  className,
  color,
  type,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className={tw(
        `inline-flex justify-center rounded border border-transparent
        px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
        color.bg,
        color.text,
        color.hover,
        color.active,
        color.border,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
