import { type FC, type ReactNode } from "react";
import { datestring } from "../utils/date";
import { tw } from "../utils/tailwind";

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
    <div className="relative flex w-full flex-col items-start justify-center text-zinc-500">
      <label className="group flex w-full" data-error={!!error}>
        <span
          className={tw(`p-1 text-sm font-medium transition-all group-data-[error='true']:-z-10 
          group-data-[error='true']:translate-y-full group-data-[error='true']:opacity-0`)}
        >
          {label}
        </span>
        <span
          className={tw(`absolute -z-10 w-full translate-y-full p-1 text-xs font-medium text-red-700 opacity-0 transition-all
          group-data-[error='true']:-z-0 group-data-[error='true']:translate-y-0 group-data-[error='true']:opacity-100`)}
        >
          {error}
        </span>
      </label>
      <input
        type="datetime-local"
        className={tw(`min-h-[1.25rem] w-full rounded border border-slate-300 bg-transparent px-3 py-3 text-sm 
        [-moz-appearance:textfield] [-webkit-appearance:none] placeholder:text-slate-400 focus:outline-none 
        disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-red-700 dark:border-slate-600 
        dark:text-white dark:placeholder:text-slate-700 dark:data-[error=true]:border-red-300`)}
        defaultValue={initialValue ? datestring(initialValue) : undefined}
        onChange={(e) => {
          const valueAsDate = new Date(e.target.value);
          if (valueAsDate) {
            onChange(valueAsDate);
          }
        }}
        data-error={!!error}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default DateInputField;
