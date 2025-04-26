// routes.jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Step1 from './pages/Step1_PilihKategori';
import Step2 from './pages/Step2_Pengelompokan';
import Step3 from './pages/Step3_NilaiPokok';
import Step4 from './pages/Step4_StatusPelaku';
import Step5 from './pages/Step5_Pembobotan';
import Step6 from './pages/Step6_Meringankan';
import Step7 from './pages/Step7_HasilPerhitungan';
import Step8 from './pages/Step8_GradeHukuman';
import Step9 from './pages/Step9_HasilOutput';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/step/1" element={<Step1 />} />
    <Route path="/step/2" element={<Step2 />} />
    <Route path="/step/3" element={<Step3 />} />
    <Route path="/step/4" element={<Step4 />} />
    <Route path="/step/5" element={<Step5 />} />
    <Route path="/step/6" element={<Step6 />} />
    <Route path="/step/7" element={<Step7 />} />
    <Route path="/step/8" element={<Step8 />} />
    <Route path="/step/9" element={<Step9 />} />
  </Routes>
);

export default AppRoutes;
