// src/components/InputText.jsx

export default function InputText({ label, type = "text", value, onChange, placeholder = "" }) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="border px-3 py-2 rounded-md w-full
                     bg-white text-gray-900
                     dark:bg-gray-800 dark:text-gray-100
                     dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    );
  }
  