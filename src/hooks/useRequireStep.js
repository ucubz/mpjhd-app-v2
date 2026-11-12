import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';

// Jika isian langkah sebelumnya belum ada (mis. halaman dibuka langsung/refresh), kembali ke awal.
export default function useRequireStep(requiredFields = [], redirectTo = '/step/1') {
  const { state } = useMPJHD();
  const resetMPJHD = useResetMPJHD();
  const navigate = useNavigate();
  const key = requiredFields.join('|');

  useEffect(() => {
    const missing = requiredFields.some((field) => !state[field]);
    if (missing) {
      resetMPJHD();
      navigate(redirectTo, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, key, navigate, redirectTo, resetMPJHD]);
}
