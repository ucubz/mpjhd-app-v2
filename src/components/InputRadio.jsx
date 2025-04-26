// src/components/InputRadio.jsx

export default function InputRadio({ label, name, value, onChange, options }) {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <div className="flex flex-col gap-2">
          {options.map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(e.target.value)}
                className="accent-primary"
              />
              <span className="text-gray-700 dark:text-gray-200">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  