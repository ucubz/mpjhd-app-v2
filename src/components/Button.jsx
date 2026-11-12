// src/components/Button.jsx
// Tombol utama. Lebar penuh secara bawaan (tombol Lanjut seragam di semua halaman);
// beri className="!w-auto" bila perlu tombol kecil.
export default function Button({ children, onClick, type = 'button', disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white',
        'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800',
        disabled
          ? 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
          : 'bg-primary hover:bg-primary-dark',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
