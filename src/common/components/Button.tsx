import { type Palette } from "@d-exclaimation/common/tailwind";
import { type FC, type ReactNode } from "react";

type ButtonProps = {
  className?: string;
  color: {
    bg: Palette["bg"];
    text: Palette["text"];
    active: `active:${Palette["bg"]}`;
    hover: `hover:${Palette["bg"]}`;
    border: `focus-visible:${Palette["ring"]}`;
  };
  onClick: () => void;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ className, color, onClick, children }) => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center rounded-md border border-transparent 
      ${color.bg} px-4 py-2 text-sm font-medium ${color.text} 
      ${color.hover} ${color.active}
      focus:outline-none focus-visible:ring-2 
      ${color.border} focus-visible:ring-offset-2
      ${className ?? ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
