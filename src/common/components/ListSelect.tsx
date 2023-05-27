import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ListSelectProps<T extends string | number> = {
  label: string;
  error?: string;
  options: Array<{ name: string; value: T }>;
  selected: { value: T; name: string };
  setSelected: (opt: { value: T; name: string }) => void;
};

const ListSelect = <T extends string | number>({
  label,
  error,
  options,
  selected,
  setSelected,
}: ListSelectProps<T>) => {
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
      <Listbox value={selected} onChange={setSelected}>
        <div className="w-full">
          <Listbox.Button
            className="w-full py-3 placeholder:text-slate-400 text-sm
            focus:outline-none disabled:cursor-not-allowed text-start
            disabled:opacity-50 rounded border border-slate-300 bg-transparent 
            px-3 data-[error='true']:border-red-700 truncate
            dark:border-slate-600 dark:text-white 
            dark:data-[error='true']:border-red-300"
          >
            {selected.name}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute mt-1 h-max w-full z-50 max-w-md overflow-hidden rounded bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
              <Listbox.Options className="mt-1 max-h-24 md:max-h-32 z-50 w-full overflow-auto rounded bg-white dark:bg-zinc-800 py-1 text-base focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 ${
                        selected.value === option.value
                          ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                          : active
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                          : "text-gray-900 dark:text-gray-100"
                      }`
                    }
                    value={option}
                  >
                    <span
                      className={`block truncate text-sm ${
                        selected.value === option.value
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected.value === option.value ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600 dark:text-zinc-400">
                        <img
                          src="/icons/checked.svg"
                          className="h-5 w-5 dark:content-[url('/icons/checked-selected.svg')]"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListSelect;
