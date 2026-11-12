import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import useRequireStep from '../hooks/useRequireStep';
import StepLayout from '../components/StepLayout';
import OptionList from '../components/OptionList';
import { formatNilai } from '../utils_v2/formatNilai';
import {
  KERUGIAN_OPTIONS, KERUGIAN_IV_OPTIONS, PERAN_OPTIONS,
  NILAI_KERUGIAN_INDIVIDU, NILAI_KERUGIAN_IV, NILAI_PERAN,
} from '../utils_v2/opsiFaktor';

const tipeOptions = [
  { value: 'bersama', label: 'Bersama-sama' },
  { value: 'individu', label: 'Secara individu' },
];

const dgNilai = (options, nilai) =>
  options.map((o) => ({ value: o.value, label: o.label, hint: `+${formatNilai(nilai[o.value])}` }));

export default function Step4_FaktorUtama() {
  useRequireStep(['kelompok'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = state.kelompok;
  const tipe = state.tipeKelompokIII;
  const faktor = state.faktorUtama;

  const isKelompokIII = kelompok === 'III';
  const isIV = kelompok === 'IV';

  const showPeran = isKelompokIII && tipe === 'bersama';
  const showKerugian = (isKelompokIII && tipe === 'individu') || isIV;

  // Hanya menyimpan pilihan; nilainya dihitung di utils_v2/opsiFaktor.js
  const updateFaktor = (field) => (value) => dispatch({ type: 'SET_FAKTOR_UTAMA', field, value });

  const isComplete =
    (!isKelompokIII || Boolean(tipe)) &&
    (!showPeran || Boolean(faktor.peran)) &&
    (!showKerugian || Boolean(faktor.jumlahKerugian));

  return (
    <StepLayout
      step={4}
      title="Faktor Pembobotan Utama"
      subtitle="Pilih jawaban pada setiap pertanyaan, lalu tekan Lanjut."
      onNext={() => navigate('/step/5')}
      nextDisabled={!isComplete}
    >
      {isKelompokIII && (
        <div className="mb-6">
          <p className="mb-2 font-semibold">Apakah pelanggaran dilakukan:</p>
          <OptionList
            value={tipe || null}
            onChange={(v) => dispatch({ type: 'SET', field: 'tipeKelompokIII', value: v })}
            options={tipeOptions}
            label="Cara melakukan pelanggaran"
          />
        </div>
      )}

      {showPeran && (
        <div className="mb-2">
          <p className="mb-2 font-semibold">Peran pelaku:</p>
          <OptionList
            value={faktor.peran || null}
            onChange={updateFaktor('peran')}
            options={dgNilai(PERAN_OPTIONS, NILAI_PERAN)}
            label="Peran pelaku"
          />
        </div>
      )}

      {showKerugian && (
        <div className="mb-2">
          <p className="mb-2 font-semibold">
            {isIV
              ? 'Kerugian bagi pihak yang dilayani:'
              : 'Jumlah uang yang diterima atau kerugian negara/pihak lain:'}
          </p>
          <OptionList
            value={faktor.jumlahKerugian || null}
            onChange={updateFaktor('jumlahKerugian')}
            options={isIV ? dgNilai(KERUGIAN_IV_OPTIONS, NILAI_KERUGIAN_IV) : dgNilai(KERUGIAN_OPTIONS, NILAI_KERUGIAN_INDIVIDU)}
            label="Jumlah kerugian"
          />
        </div>
      )}
    </StepLayout>
  );
}
