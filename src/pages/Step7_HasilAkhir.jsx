// Step7_HasilAkhir.jsx
import { useNavigate } from 'react-router-dom';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import { useEffect } from 'react';

import { tentukanNilaiPokok } from '../utils_v2/tentukanNilaiPokok';
import { hitungFaktorTambahan } from '../utils_v2/hitungFaktorTambahan';
import { hitungFaktorMeringankan } from '../utils_v2/hitungFaktorMeringankan';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';
import { konversiGrade } from '../utils_v2/konversiGrade';
import { hitungNilaiKelompokI } from '../utils_v2/hitungNilaiKelompokI';

// --- Custom Hook ---
function useRequireStep(requiredFields = [], redirectTo = '/step/1') {
  const { state } = useMPJHD();
  const resetMPJHD = useResetMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    const missing = requiredFields.some((field) => !state[field]);
    if (missing) {
      resetMPJHD();
      navigate(redirectTo, { replace: true });
    }
  }, [state, requiredFields, navigate, redirectTo, resetMPJHD]);
}

export default function Step7_HasilAkhir() {
  useRequireStep(['kelompok']);

  const { state } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = String(state.kelompok || '').toUpperCase();

  const nilaiPokok = kelompok === 'I'
    ? hitungNilaiKelompokI(state.jumlahHariTidakMasuk || 0)
    : tentukanNilaiPokok(kelompok, state.pasalUtama, state.dampak, state.jabatan);

  const nilaiTambahan = kelompok !== 'I' ? hitungFaktorTambahan(state) : 0;
  const pengurang = kelompok !== 'I' ? hitungFaktorMeringankan(state) : 0;

  const { nilaiAkhir } = hitungNilaiAkhir({
    ...state,
    nilaiPokok,
    nilaiTambahan,
    pengurangMeringankan: pengurang,
  });

  const hasilGrade = konversiGrade(nilaiAkhir);

  const renderValue = (val) => {
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (val === null || val === undefined) return '(kosong)';
    if (typeof val === 'object') return JSON.stringify(val);
    return val.toString();
  };

  const renderType = (val) => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
  };

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 6" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Debug: Cek Isi State & Nilai</h2>

        <div className="overflow-auto mb-6">
          <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="border px-2 py-1">Nama State</th>
                <th className="border px-2 py-1">Isi</th>
                <th className="border px-2 py-1">Tipe</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(state).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-2 py-1 font-mono">{key}</td>
                  <td className="border px-2 py-1">{renderValue(value)}</td>
                  <td className="border px-2 py-1 text-gray-500">{renderType(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border rounded-md p-4 text-sm space-y-1 mb-8">
          <p><strong>Kelompok:</strong> {kelompok}</p>
          <p><strong>Nilai Pokok:</strong> {nilaiPokok}</p>
          <p><strong>Nilai Tambahan:</strong> {nilaiTambahan}</p>
          <p><strong>Pengurang Meringankan:</strong> {pengurang}</p>
          <p><strong>Nilai Akhir:</strong> {nilaiAkhir}</p>
          <p><strong>Grade Hukuman:</strong> {hasilGrade.grade}</p>
          <p><strong>Jenis Hukuman:</strong> {hasilGrade.hukuman}</p>
        </div>

        <Stepper currentStep={7} totalSteps={7} />
        <Button className="mt-4" onClick={() => navigate('/step/6')}>Kembali</Button>
      </Card>
    </PageWrapper>
  );
}