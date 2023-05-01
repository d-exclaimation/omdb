import { type FC } from "react";

type TextareaProps = {
  label: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

const Textarea: FC<TextareaProps> = ({
  label,
  placeholder,
  error,
  value,
  onChange,
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
      <textarea
        placeholder={placeholder}
        className="flex w-full h-28 rounded bg-transparent px-3 border border-slate-300
        py-3 text-sm placeholder:text-slate-400 focus:outline-none data-[error='true']:border-red-700
        disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-error={!!error}
      />
    </div>
  );
};

export default Textarea;
