// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Step1 from '../pages/Step1_PilihKategori';
import Step2 from '../pages/Step2_PilihPasal';
import Step3 from '../pages/Step3_KondisiAwal';
import Step4 from '../pages/Step4_FaktorUtama';
import Step5 from '../pages/Step5_FaktorTambahan';
import Step6 from '../pages/Step6_FaktorMeringankan';
import Step7 from '../pages/Step7_HasilAkhir';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ⬇️ Redirect jika akses ke "/" langsung */}
      <Route path="/" element={<Navigate to="/step/1" replace />} />
      <Route path="/step/1" element={<Step1 />} />
      <Route path="/step/2" element={<Step2 />} />
      <Route path="/step/3" element={<Step3 />} />
      <Route path="/step/4" element={<Step4 />} />
      <Route path="/step/5" element={<Step5 />} />
      <Route path="/step/6" element={<Step6 />} />
      <Route path="/step/7" element={<Step7 />} />
    </Routes>
  );
}
