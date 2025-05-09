import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export default function InputDropdown({ label, value, onChange, options }) {
  const selected = options.find((opt) => opt.value === value) || null;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </label>
      )}

      <Listbox value={selected} onChange={(val) => onChange(val.value)}>
        <div className="relative">
          <ListboxButton className="relative w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left text-sm text-gray-900 dark:text-gray-100">
            {selected?.label || '-- Pilih --'}
            <ChevronDownIcon
              className="absolute right-2.5 top-2.5 h-5 w-5 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg focus:outline-none text-sm">
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt}
                className={({ active, selected }) =>
                  `cursor-pointer select-none flex items-center gap-2 px-3 py-2 ${
                    active
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-white'
                      : 'text-gray-800 dark:text-gray-100'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <CheckIcon
                      className={`h-4 w-4 text-blue-600 dark:text-white ${
                        selected ? 'visible' : 'invisible'
                      }`}
                    />
                    <span>{opt.label}</span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
