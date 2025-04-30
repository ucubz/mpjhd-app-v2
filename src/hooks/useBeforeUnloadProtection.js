// src/hooks/useBeforeUnloadProtection.js
import { useEffect } from 'react';

export default function useBeforeUnloadProtection(active = true) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (active) {
        event.preventDefault();
        event.returnValue = ''; // Ini penting untuk memicu popup konfirmasi
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [active]);
}
