export default function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl shadow-sm transition-all text-sm md:text-base font-medium
        ${disabled 
          ? 'bg-gray-400 text-white cursor-not-allowed' 
          : 'bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark text-white'}
      `}
    >
      {children}
    </button>
  )
}
