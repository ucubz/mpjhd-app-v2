// src/components/Button.jsx

export default function Button({ children, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-24 inline-flex items-center gap-2
        rounded-md justify-center
        px-3 py-1.5 text-sm font-semibold
        shadow-inner shadow-white/10
        transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        ${disabled
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : 'bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark text-white'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
