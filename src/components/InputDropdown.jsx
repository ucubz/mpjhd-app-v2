import { Listbox } from '@headlessui/react';

export default function InputDropdown({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </label>
      )}
      
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 text-left text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            {options.find(opt => opt.value === value)?.label || '-- Pilih --'}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 text-sm">
            {options.map((opt, idx) => (
              <Listbox.Option
                key={idx}
                value={opt.value}
                className={({ active }) =>
                  `cursor-pointer select-none p-2 ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-100'
                  }`
                }
              >
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
