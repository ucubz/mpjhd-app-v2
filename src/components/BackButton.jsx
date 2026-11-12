// src/components/BackButton.jsx
import { useNavigate } from 'react-router-dom';

// Selalu kembali ke halaman sebelumnya yang benar-benar dilalui (alur tiap kelompok berbeda-beda).
export default function BackButton({ label = 'Kembali', className = '' }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={[
        'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold',
        'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        className,
      ].join(' ')}
    >
      ← {label}
    </button>
  );
}
