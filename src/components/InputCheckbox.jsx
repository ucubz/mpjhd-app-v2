// src/components/InputCheckbox.jsx

export default function InputCheckbox({ label, value, onChange }) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-primary"
        />
        <label className="text-gray-700 dark:text-gray-200">
          {label}
        </label>
      </div>
    );
  }
  