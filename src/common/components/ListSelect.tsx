import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { tw } from "../utils/tailwind";

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
    <div className="relative flex w-full flex-col items-start justify-center text-zinc-500">
      <label className="group flex w-full" data-error={!!error}>
        <span
          className={tw(`p-1 text-sm font-medium transition-all group-data-[error='true']:-z-10 
          group-data-[error='true']:translate-y-full group-data-[error='true']:opacity-0`)}
        >
          {label}
        </span>
        <span
          className={tw(`absolute -z-10 w-full translate-y-full p-1 text-xs
          font-medium text-red-700 opacity-0 transition-all group-data-[error='true']:-z-0 
          group-data-[error='true']:translate-y-0 group-data-[error='true']:opacity-100`)}
        >
          {error}
        </span>
      </label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="w-full">
          <Listbox.Button
            className={tw(`w-full truncate rounded border-slate-300 
            bg-transparent px-3 py-3 text-start text-sm placeholder:text-slate-400 
            focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
            data-[error='true']:border-red-700 dark:border-slate-600 dark:text-white 
            dark:data-[error='true']:border-red-300`)}
          >
            {selected.name}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={tw(
                `absolute z-50 mt-1 h-max w-full max-w-md overflow-hidden rounded bg-white 
                shadow-lg ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5`
              )}
            >
              <Listbox.Options
                className={tw(
                  `z-50 mt-1 max-h-24 w-full overflow-auto rounded bg-white py-1 
                  text-base focus:outline-none dark:bg-zinc-800 sm:text-sm md:max-h-32`
                )}
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      tw(
                        `relative cursor-default select-none py-2 pl-10`,
                        selected.value === option.value
                          ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                          : active
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                          : "text-gray-900 dark:text-gray-100"
                      )
                    }
                    value={option}
                  >
                    <span
                      className={tw(
                        `block truncate text-sm`,
                        selected.value === option.value
                          ? "font-medium"
                          : "font-normal"
                      )}
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
