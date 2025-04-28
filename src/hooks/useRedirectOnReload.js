import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function useRedirectOnReload(shouldRedirect = true) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!shouldRedirect) return;

    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    // Cek kalau ini reload dan bukan di halaman awal
    if (isReload && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [navigate, location, shouldRedirect]);
}
