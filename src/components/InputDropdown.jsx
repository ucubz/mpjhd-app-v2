// src/components/InputDropdown.jsx

export default function InputDropdown({ label, value, onChange, options }) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border px-2 py-2 rounded-md w-full
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:text-gray-100
                     dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">-- Pilih --</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  