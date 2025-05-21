import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import Button from '../components/Button';

// --- Custom Hook untuk validasi step ---
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

export default function Step6_Meringankan() {
  useRequireStep(['kelompok']);

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const kelompok = String(state.kelompok || '').toUpperCase();
  const isKelompokI = kelompok === 'I';
  const meringankan = state.faktorMeringankan || {};
  const jumlahHari = state.jumlahHariTidakMasuk ?? '';

  const updateCheckbox = (field) => {
    dispatch({
      type: 'SET_FAKTOR_MERINGANKAN',
      field,
      value: !meringankan[field],
    });
  };

  const handleHariChange = (e) => {
    const angka = parseInt(e.target.value);
    dispatch({
      type: 'SET',
      field: 'jumlahHariTidakMasuk',
      value: !isNaN(angka) ? angka : '',
    });
  };

  const handleNext = () => {
    if (isKelompokI) {
      dispatch({ type: 'SET_PENGURANG_MERINGANKAN', pengurang: 0 });
    }
    navigate('/step/7');
  };

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 5" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">
          {isKelompokI ? 'Jumlah Hari Tidak Masuk Kerja' : 'Faktor Meringankan'}
        </h2>

        {isKelompokI ? (
          <div className="mb-6">
            <label className="block font-semibold mb-2 dark:text-white">
              Masukkan jumlah hari tidak masuk kerja tanpa keterangan:
            </label>
            <input
              type="number"
              value={jumlahHari}
              onChange={handleHariChange}
              className="w-full border px-4 py-2 rounded-md dark:bg-gray-800 dark:text-white"
              min={0}
            />
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={meringankan.kooperatif || false}
                onChange={() => updateCheckbox('kooperatif')}
                className="h-4 w-4 mt-1 accent-blue-600"
              />
              <span className="text-sm leading-relaxed dark:text-white">
                Berperilaku baik dan/atau kooperatif selama proses pemeriksaan (nilai 5)
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={meringankan.inisiator || false}
                onChange={() => updateCheckbox('inisiator')}
                className="h-4 w-4 mt-1 accent-blue-600"
              />
              <span className="text-sm leading-relaxed dark:text-white">
                Inisiator pengungkapan pelanggaran signifikan (nilai 10)
              </span>
            </label>
          </div>

        )}

        <Button onClick={handleNext}>Lanjut</Button>

        <div className="mt-12">
          <Stepper currentStep={6} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}
