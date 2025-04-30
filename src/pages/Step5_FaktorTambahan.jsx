import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';
import { Listbox } from '@headlessui/react';
import { hitungFaktorTambahan } from '../utils_v2/hitungFaktorTambahan';

const options = {
  banyakPasal: [
    { label: 'Hanya satu pasal yang dilanggar', value: 'satu' },
    { label: 'Terdapat dua pasal yang dilanggar', value: 'dua' },
    { label: 'Lebih dari dua pasal yang dilanggar', value: 'lebihDua' },
  ],
  hukdis: [
    { label: 'Belum pernah dijatuhi hukuman disiplin', value: 'belumPernah' },
    { label: 'Pernah satu kali dijatuhi hukdis', value: 'pernahSatu' },
    { label: 'Lebih dari satu kali dijatuhi hukdis', value: 'lebihSatu' },
  ],
  kesengajaan: [
    { label: 'Terpaksa melakukan pelanggaran', value: 'terpaksa' },
    { label: 'Tidak sengaja/lalai', value: 'lalai' },
    { label: 'Sengaja melakukan pelanggaran', value: 'sengaja' },
  ],
  hambatan: [
    { label: 'Tidak ditemukan hambatan', value: 'tidakAda' },
    { label: 'Tidak kooperatif', value: 'tidakKooperatif' },
    { label: 'Menghalangi pemeriksaan', value: 'menghalangi' },
  ],
};

function Dropdown({ label, field, value, onChange, list }) {
  return (
    <div className="mb-6">
      <p className="font-semibold mb-2">{label}</p>
      <Listbox value={value} onChange={(val) => onChange(field, val)}>
        <div className="relative">
          <Listbox.Button className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-left">
            {list.find((x) => x.value === value)?.label || 'Pilih...'}
          </Listbox.Button>
          <Listbox.Options className="absolute w-full mt-1 rounded-md border bg-white dark:bg-gray-800 z-10">
            {list.map((item) => (
              <Listbox.Option
                key={item.value}
                value={item.value}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100 dark:bg-blue-900' : ''}`
                }
              >
                {item.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

export default function Step5_FaktorTambahan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const faktor = state.faktorPembobotan;

  const isComplete =
    faktor.banyakPasal &&
    faktor.hukdis &&
    faktor.kesengajaan &&
    faktor.hambatan;

  const updateField = (field, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', field, value });
  };

  const handleNext = () => {
    const nilaiTambahan = hitungTotalTambahan(state);
    dispatch({ type: 'SET_NILAI_TAMBAHAN', nilaiTambahan });
    navigate('/step/6');
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          if (confirm('Yakin ingin mereset dan kembali ke awal?')) {
            dispatch({ type: 'RESET' });
            navigate('/step/1');
          }
        }}
        className="text-red-600 font-semibold mb-4"
      >
        Reset
      </button>

      <h2 className="text-xl font-bold mb-6">Faktor Pembobotan Tambahan</h2>

      <Dropdown
        label="Banyaknya jenis pelanggaran"
        field="banyakPasal"
        value={faktor.banyakPasal}
        onChange={updateField}
        list={options.banyakPasal}
      />
      <Dropdown
        label="Riwayat Hukuman Disiplin"
        field="hukdis"
        value={faktor.hukdis}
        onChange={updateField}
        list={options.hukdis}
      />
      <Dropdown
        label="Faktor Kesengajaan"
        field="kesengajaan"
        value={faktor.kesengajaan}
        onChange={updateField}
        list={options.kesengajaan}
      />
      <Dropdown
        label="Hambatan Pemeriksaan"
        field="hambatan"
        value={faktor.hambatan}
        onChange={updateField}
        list={options.hambatan}
      />

      {isComplete && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Lanjut
        </button>
      )}

      <div className="mt-12">
        <Stepper currentStep={5} totalSteps={7} />
        <button
          onClick={() => navigate('/step/4')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}