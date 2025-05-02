import { useNavigate } from 'react-router-dom';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import Button from '../components/Button';
import { Switch } from '@headlessui/react';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';
import { useEffect } from 'react';

// --- CUSTOM HOOK ---
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
  useRequireStep(['kelompok']); // memastikan kelompok sudah terisi

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const kelompok = String(state.kelompok || '').toUpperCase();
  const isKelompokI = kelompok === 'I';

  const meringankan = state.faktorMeringankan;
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

  const hitungPengurang = () => {
    let total = 0;
    if (meringankan.kooperatif) total += 5;
    if (meringankan.inisiator) total += 10;
    return total;
  };

  const handleNext = () => {
    if (isKelompokI) {
      navigate('/step/7');
    } else {
      const pengurang = hitungPengurang();
      dispatch({ type: 'SET_PENGURANG_MERINGANKAN', pengurang });

      const hasil = hitungNilaiAkhir({ ...state, pengurangMeringankan: pengurang });
      dispatch({ type: 'SET_NILAI_AKHIR', nilaiAkhir: hasil.nilaiAkhir });

      navigate('/step/7');
    }
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
          <div className="space-y-6 mb-6">
            <Switch.Group>
              <div className="flex items-center justify-between">
                <Switch.Label className="font-medium dark:text-white">
                  Berperilaku baik dan/atau kooperatif selama proses pemeriksaan (nilai 5)
                </Switch.Label>
                <Switch
                  checked={meringankan.kooperatif}
                  onChange={() => updateCheckbox('kooperatif')}
                  className={`${
                    meringankan.kooperatif ? 'bg-blue-600' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      meringankan.kooperatif ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>

            <Switch.Group>
              <div className="flex items-center justify-between">
                <Switch.Label className="font-medium dark:text-white">
                  Inisiator pengungkapan pelanggaran signifikan (nilai 10)
                </Switch.Label>
                <Switch
                  checked={meringankan.inisiator}
                  onChange={() => updateCheckbox('inisiator')}
                  className={`${
                    meringankan.inisiator ? 'bg-blue-600' : 'bg-gray-300'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span
                    className={`${
                      meringankan.inisiator ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
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