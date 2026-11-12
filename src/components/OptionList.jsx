import { RadioGroup } from '@headlessui/react';

/**
 * Daftar pilihan satu jawaban (kartu). Dipakai di semua halaman supaya tampilan dan
 * perilakunya sama: memilih hanya menyorot pilihan; pindah halaman lewat tombol Lanjut.
 *
 * options: [{ value, label, description?, hint? }]
 */
export default function OptionList({ value, onChange, options, label }) {
  return (
    <RadioGroup value={value ?? null} onChange={onChange} aria-label={label}>
      <div className="space-y-2">
        {options.map((o) => (
          <RadioGroup.Option key={String(o.value)} value={o.value} className="outline-none">
            {({ checked, focus }) => (
              <div
                className={[
                  'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors',
                  checked
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600 dark:bg-blue-950/40'
                    : 'border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700/60',
                  focus ? 'ring-2 ring-blue-400' : '',
                ].join(' ')}
              >
                <span
                  aria-hidden="true"
                  className={[
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                    checked ? 'border-blue-600 bg-blue-600' : 'border-gray-400 dark:border-gray-500',
                  ].join(' ')}
                >
                  {checked && <span className="h-2 w-2 rounded-full bg-white" />}
                </span>
                <span className="min-w-0 flex-1 text-sm">
                  <span className="block font-medium text-gray-900 dark:text-gray-100">{o.label}</span>
                  {o.description && (
                    <span className="mt-0.5 block text-gray-600 dark:text-gray-300">{o.description}</span>
                  )}
                </span>
                {o.hint && (
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {o.hint}
                  </span>
                )}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
