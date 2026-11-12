import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import useRequireStep from '../hooks/useRequireStep';
import StepLayout from '../components/StepLayout';
import CheckOption from '../components/CheckOption';
import { hitungNilaiKelompokI } from '../utils_v2/hitungNilaiKelompokI';
import { NILAI_KOOPERATIF, NILAI_INISIATOR } from '../utils_v2/hitungFaktorMeringankan';

export default function Step6_Meringankan() {
  useRequireStep(['kelompok'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const isKelompokI = String(state.kelompok || '').toUpperCase() === 'I';
  const meringankan = state.faktorMeringankan || {};
  const jumlahHari = state.jumlahHariTidakMasuk ?? '';

  const toggle = (field) =>
    dispatch({ type: 'SET_FAKTOR_MERINGANKAN', field, value: !meringankan[field] });

  const handleHariChange = (e) => {
    const angka = parseInt(e.target.value, 10);
    dispatch({ type: 'SET', field: 'jumlahHariTidakMasuk', value: Number.isNaN(angka) ? '' : angka });
  };

  const hariValid = Number.isInteger(jumlahHari) && jumlahHari > 0;
  const berturut = state.tipeHariTidakMasuk === 'berturut';
  const nilaiHari = hariValid ? hitungNilaiKelompokI(jumlahHari, berturut) : 0;

  return (
    <StepLayout
      step={6}
      title={isKelompokI ? 'Jumlah Hari Tidak Masuk Kerja' : 'Faktor Meringankan'}
      subtitle={isKelompokI ? undefined : 'Centang yang sesuai (boleh keduanya, boleh tidak ada), lalu tekan Lanjut.'}
      onNext={() => navigate('/step/7')}
      nextDisabled={isKelompokI && !hariValid}
    >
      {isKelompokI ? (
        <div>
          <label htmlFor="hari" className="mb-2 block font-semibold">
            Jumlah hari tidak masuk kerja tanpa keterangan
          </label>
          <input
            id="hari"
            type="number"
            inputMode="numeric"
            min={1}
            value={jumlahHari}
            onChange={handleHariChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {jumlahHari === 10 && (
            <div className="mt-3">
              <CheckOption
                checked={berturut}
                onChange={(e) =>
                  dispatch({ type: 'SET_TIPE_HARI_TIDAK_MASUK', value: e.target.checked ? 'berturut' : '' })
                }
                label="Tidak masuk 10 hari kerja secara berturut-turut"
              />
            </div>
          )}
          {hariValid && nilaiHari === 0 && (
            <p className="mt-3 text-sm text-amber-700 dark:text-amber-300">
              Tidak masuk kurang dari 3 hari tidak diatur dalam tabel PMK 123/2023.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <CheckOption
            checked={Boolean(meringankan.kooperatif)}
            onChange={() => toggle('kooperatif')}
            label="Berperilaku baik dan/atau kooperatif selama proses pemeriksaan"
            hint={`−${NILAI_KOOPERATIF}`}
          />
          <CheckOption
            checked={Boolean(meringankan.inisiator)}
            onChange={() => toggle('inisiator')}
            label="Inisiator pengungkapan pelanggaran signifikan"
            hint={`−${NILAI_INISIATOR}`}
          />
          <p className="pt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
            Catatan: faktor inisiator berlaku bila pelanggaran dilakukan bersama-sama oleh lebih dari satu
            Terperiksa dan diungkap/dilaporkan kepada UKI atau Inspektorat Jenderal.
          </p>
        </div>
      )}
    </StepLayout>
  );
}
