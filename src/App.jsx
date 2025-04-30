import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { MPJHDProvider, useMPJHD } from './context/MPJHDContext';
import useBeforeUnloadProtection from './hooks/useBeforeUnloadProtection';

function AppWithProtection() {
  const { state } = useMPJHD();
  useBeforeUnloadProtection(!state.isFinished); // Proteksi aktif jika belum selesai
  return <AppRoutes />;
}

export default function App() {
  return (
    <MPJHDProvider>
      <Router>
        <AppWithProtection />
      </Router>
    </MPJHDProvider>
  );
}
