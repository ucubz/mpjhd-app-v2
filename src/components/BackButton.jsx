import { useNavigate } from 'react-router-dom'

export default function BackButton({ label = "Kembali" }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm md:text-base"
    >
      {label}
    </button>
  )
}
