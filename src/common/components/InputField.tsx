import { type FC, type ReactNode } from "react";
import { tw } from "../utils/tailwind";

type InputFieldProps = {
  label: string;
  type?: "text" | "password";
  placeholder?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "email"
    | "search"
    | "tel"
    | "url";
  error?: string;
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
};

const InputField: FC<InputFieldProps> = ({
  label,
  error,
  inputMode,
  value,
  onChange,
  type,
  placeholder,
  children,
}) => {
  return (
    <div className="relative flex w-full flex-col items-start justify-center text-zinc-500 dark:text-zinc-500">
      <label className="group flex w-full" data-error={!!error}>
        <span
          className={tw(`p-1 text-sm font-medium transition-all group-data-[error='true']:-z-10 
          group-data-[error='true']:translate-y-full group-data-[error='true']:opacity-0`)}
        >
          {label}
        </span>
        <span
          className={tw(`absolute -z-10 w-full translate-y-full p-1 text-xs font-medium
          text-red-700 opacity-0 transition-all group-data-[error='true']:-z-0 group-data-[error='true']:translate-y-0 
          group-data-[error='true']:opacity-100 dark:text-red-300`)}
        >
          {error}
        </span>
      </label>
      <input
        type={type ?? "text"}
        inputMode={inputMode}
        placeholder={placeholder}
        className={tw(`w-full rounded border border-slate-300
        bg-transparent px-3 py-3 text-sm placeholder:text-slate-400 
        focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 
        data-[error='true']:border-red-700 dark:border-slate-600 dark:text-white 
        dark:placeholder:text-slate-700 dark:data-[error='true']:border-red-300`)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-error={!!error}
        autoCapitalize="none"
      />
      {children}
    </div>
  );
};

export default InputField;
