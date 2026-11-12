import { useNavigate } from 'react-router-dom';
import { useResetMPJHD } from '../context/MPJHDContext';

export default function ResetButton({ children = "Mulai Ulang", className = "" }) {
  const reset = useResetMPJHD();
  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    navigate('/');
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300',
        'hover:bg-red-100 dark:hover:bg-red-900/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400',
        'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
