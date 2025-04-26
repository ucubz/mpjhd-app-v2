import { Routes, Route } from 'react-router-dom'

// Import semua page baru
import Step1 from '../pages/Step1_PilihKategori'
import Step2 from '../pages/Step2_PilihPasalUtama'
import Step3 from '../pages/Step3_KelompokOtomatis'
import Step4 from '../pages/Step4_PertanyaanTambahan'
import Step5 from '../pages/Step5_FaktorUtama'
import Step6 from '../pages/Step6_FaktorPembobotan'
import Step7 from '../pages/Step7_FaktorMeringankan'
import Step8 from '../pages/Step8_HitungHasilMPJHD'
import Step9 from '../pages/Step9_KonversiGrade'
import Step10 from '../pages/Step10_HasilTabelOutput'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Step1 />} />
      <Route path="/step/2" element={<Step2 />} />
      <Route path="/step/3" element={<Step3 />} />
      <Route path="/step/4" element={<Step4 />} />
      <Route path="/step/5" element={<Step5 />} />
      <Route path="/step/6" element={<Step6 />} />
      <Route path="/step/7" element={<Step7 />} />
      <Route path="/step/8" element={<Step8 />} />
      <Route path="/step/9" element={<Step9 />} />
      <Route path="/step/10" element={<Step10 />} />
    </Routes>
  )
}
