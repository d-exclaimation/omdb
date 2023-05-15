import { type Palette } from "@d-exclaimation/common/tailwind";
import { type FC, type ReactNode } from "react";

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
      className={`inline-flex justify-center rounded border border-transparent 
      ${color.bg} px-4 py-2 text-sm font-medium ${color.text} 
      ${color.hover} ${color.active} disabled:cursor-not-allowed
      focus:outline-none focus-visible:ring-2 
      ${color.border} focus-visible:ring-offset-2
      ${className ?? ""} disabled:opacity-50`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
