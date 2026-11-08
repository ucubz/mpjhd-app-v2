import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import Button from '../components/Button';
import { hitungNilaiKelompokI } from '../utils_v2/hitungNilaiKelompokI';
import { NILAI_KOOPERATIF, NILAI_INISIATOR } from '../utils_v2/hitungFaktorMeringankan';

// --- CUSTOM HOOK: cek state step sebelumnya ---
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

// --- END CUSTOM HOOK ---

export default function Step6_Meringankan() {
  useRequireStep(['kelompok'], '/step/1');


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

  const hariValid = Number.isInteger(jumlahHari) && jumlahHari > 0;
  const berturut = state.tipeHariTidakMasuk === 'berturut';
  const nilaiHari = hariValid ? hitungNilaiKelompokI(jumlahHari, berturut) : 0;
  const canNext = !isKelompokI || hariValid;

  const handleNext = () => {
    if (canNext) navigate('/step/7');
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
              min={1}
            />
            {jumlahHari === 10 && (
              <label className="mt-3 flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={berturut}
                  onChange={(e) =>
                    dispatch({ type: 'SET_TIPE_HARI_TIDAK_MASUK', value: e.target.checked ? 'berturut' : '' })
                  }
                  className="h-4 w-4 mt-1 accent-blue-600"
                />
                <span className="text-sm leading-relaxed dark:text-white">
                  Tidak masuk 10 hari kerja secara berturut-turut
                </span>
              </label>
            )}
            {hariValid && nilaiHari === 0 && (
              <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
                Tidak masuk kurang dari 3 hari tidak diatur dalam tabel PMK 123/2023.
              </p>
            )}
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
                Berperilaku baik dan/atau kooperatif selama proses pemeriksaan (nilai {NILAI_KOOPERATIF})
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
                Inisiator pengungkapan pelanggaran signifikan (nilai {NILAI_INISIATOR})
              </span>
            </label>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              Catatan: faktor inisiator berlaku bila pelanggaran dilakukan bersama-sama oleh lebih dari satu
              Terperiksa dan diungkap/dilaporkan kepada UKI atau Inspektorat Jenderal.
            </p>
          </div>
        )}

        <Button onClick={handleNext} disabled={!canNext}>Lanjut</Button>

        <div className="mt-12">
          <Stepper currentStep={6} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}
