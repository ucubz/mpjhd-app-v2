/** Pilihan centang (boleh lebih dari satu) dengan tampilan kartu yang sama seperti OptionList. */
export default function CheckOption({ checked, onChange, label, hint }) {
  return (
    <label
      className={[
        'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors',
        checked
          ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 dark:bg-blue-950/40'
          : 'border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700/60',
      ].join(' ')}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-5 w-5 shrink-0 accent-blue-600"
      />
      <span className="min-w-0 flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
      {hint && (
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
          {hint}
        </span>
      )}
    </label>
  );
}
