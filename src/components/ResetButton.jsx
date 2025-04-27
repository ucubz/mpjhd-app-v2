import { useNavigate } from 'react-router-dom';
import { useResetMPJHD } from '../context/MPJHDContext';
import clsx from 'clsx';

export default function ResetButton({ children = "Kembali ke Awal", className = "" }) {
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
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'rounded-md bg-red-600 dark:bg-red-700 px-4 py-2 text-sm font-semibold text-white',
        'hover:bg-red-500 dark:hover:bg-red-600',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600',
        'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
