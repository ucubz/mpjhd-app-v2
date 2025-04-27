// src/components/BackButton.jsx

import { useNavigate } from 'react-router-dom'

export default function BackButton({ label = "Kembali", className = "" }) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`
        w-24 inline-flex items-center gap-2
        rounded-md justify-center
        px-3 py-1.5 text-sm font-semibold
        shadow-inner shadow-white/10
        transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white
        bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white
        ${className}
      `}
    >
      {label}
    </button>
  )
}
