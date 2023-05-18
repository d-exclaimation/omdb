import { type FC, type ReactNode } from "react";

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
    <div className="flex relative flex-col items-start justify-center text-zinc-500 w-full">
      <label className="flex w-full group" data-error={!!error}>
        <span
          className="text-sm p-1 font-medium transition-all group-data-[error='true']:translate-y-full 
          group-data-[error='true']:-z-10 group-data-[error='true']:opacity-0"
        >
          {label}
        </span>
        <span
          className="absolute w-full text-red-700 p-1 font-medium text-xs
          transition-all translate-y-full -z-10 opacity-0 group-data-[error='true']:translate-y-0 
          group-data-[error='true']:-z-0 group-data-[error='true']:opacity-100"
        >
          {error}
        </span>
      </label>
      <input
        type={type ?? "text"}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full py-3 placeholder:text-slate-400 text-sm focus:outline-none disabled:cursor-not-allowed 
        disabled:opacity-50 rounded border border-slate-300 bg-transparent px-3 data-[error='true']:border-red-700 "
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
