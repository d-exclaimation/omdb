import { type FC, type ReactNode } from "react";

type DateInputFieldProps = {
  label: string;
  error?: string;
  initialValue?: Date;
  onChange: (value: Date) => void;
  children?: ReactNode;
  disabled?: boolean;
};

const DateInputField: FC<DateInputFieldProps> = ({
  label,
  error,
  onChange,
  children,
  initialValue,
  disabled,
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
        type="date"
        className="w-full py-3 placeholder:text-slate-400 text-sm focus:outline-none disabled:cursor-not-allowed
        disabled:opacity-50 rounded-md border border-slate-300 bg-transparent px-3 data-[error='true']:border-red-700
        [-webkit-appearance: none] [-moz-appearance: textfield]"
        value={initialValue?.toISOString().split("T")[0]}
        onChange={(e) => e.target.valueAsDate && onChange(e.target.valueAsDate)}
        data-error={!!error}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default DateInputField;
