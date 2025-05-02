import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';

import { tentukanNilaiPokok } from '../utils_v2/tentukanNilaiPokok';
import { hitungFaktorTambahan } from '../utils_v2/hitungFaktorTambahan';
import { hitungFaktorMeringankan } from '../utils_v2/hitungFaktorMeringankan';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';
import { konversiGrade } from '../utils_v2/konversiGrade';
import { hitungNilaiKelompokI } from '../utils_v2/hitungNilaiKelompokI';

// Custom Hook
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

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    const kelompok = String(state.kelompok || '').toUpperCase();

    const nilaiPokok =
      kelompok === 'I'
        ? hitungNilaiKelompokI(state.jumlahHariTidakMasuk || 0)
        : tentukanNilaiPokok(
            kelompok,
            state.pasalUtama,
            state.dampak,
            state.jabatan
          );

    const nilaiTambahan =
      kelompok !== 'I' ? hitungFaktorTambahan(state) : 0;
    const pengurangMeringankan =
      kelompok !== 'I' ? hitungFaktorMeringankan(state) : 0;

    dispatch({ type: 'SET_NILAI_POKOK', nilaiPokok });
    dispatch({ type: 'SET_NILAI_TAMBAHAN', nilaiTambahan });
    dispatch({ type: 'SET_PENGURANG_MERINGANKAN', pengurangMeringankan });

    const { nilaiAkhir } = hitungNilaiAkhir({
      ...state,
      nilaiPokok,
      nilaiTambahan,
      pengurangMeringankan,
    });

    dispatch({ type: 'SET_NILAI_AKHIR', nilaiAkhir });

    const hasilGrade = konversiGrade(nilaiAkhir);
    dispatch({ type: 'SET_HASIL_GRADE', grade: hasilGrade.grade });
    dispatch({ type: 'SET_HASIL_HUKUMAN', jenisHukuman: hasilGrade.hukuman });
  }, [dispatch, state]);

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

        <h2 className="text-xl font-bold mb-6 text-center">Debug: Cek Isi State</h2>

        {/* Hasil Perhitungan */}
        <div className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-600">
          <h3 className="font-semibold text-lg mb-2">Hasil Perhitungan</h3>
          <ul className="space-y-1 text-sm">
            <li><strong>Nilai Pokok:</strong> {state.nilaiPokok ?? '(kosong)'}</li>
            <li><strong>Nilai Tambahan:</strong> {state.nilaiTambahan ?? '(kosong)'}</li>
            <li><strong>Pengurang Meringankan:</strong> {state.pengurangMeringankan ?? '(kosong)'}</li>
            <li><strong>Nilai Akhir:</strong> {state.nilaiAkhir ?? '(kosong)'}</li>
            <li><strong>Grade Hukuman:</strong> {state.grade ?? '(kosong)'}</li>
            <li><strong>Jenis Hukuman:</strong> {state.jenisHukuman ?? '(kosong)'}</li>
          </ul>
        </div>

        {/* Tabel Debug State */}
        <div className="overflow-auto">
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

        <div className="mt-8">
          <Stepper currentStep={7} totalSteps={7} />
          <Button className="mt-4" onClick={() => navigate('/step/6')}>Kembali</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}