import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Listbox } from '@headlessui/react';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import { hitungFaktorTambahan } from '../utils_v2/hitungFaktorTambahan';

const options = {
  banyakPasal: [
    { label: 'Hanya satu pasal yang dilanggar', value: 'satu' },
    { label: 'Terdapat dua pasal yang dilanggar', value: 'dua' },
    { label: 'Lebih dari dua pasal yang dilanggar', value: 'lebihDua' },
  ],
  hukdis: [
    { label: 'Belum pernah dijatuhi hukuman disiplin', value: 'belumPernah' },
    { label: 'Pernah satu kali dijatuhi hukuman', value: 'pernahSatu' },
    { label: 'Lebih dari satu kali dijatuhi hukuman', value: 'lebihSatu' },
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
                  `cursor-pointer px-4 py-2 ${
                    active ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`
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
  useRequireStep(['kelompok'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const faktor = state.faktorPembobotan;

  const updateField = (field, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', field, value });
  };

  const isComplete = ['banyakPasal', 'hukdis', 'kesengajaan', 'hambatan']
    .every((key) => faktor[key] !== null && faktor[key] !== '');

  const handleNext = () => {
    const nilaiTambahan = hitungFaktorTambahan(state);
    dispatch({ type: 'SET_NILAI_TAMBAHAN', nilaiTambahan });
    navigate('/step/6');
  };

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 4" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Faktor Pembobotan Tambahan</h2>

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

        <Button
          onClick={handleNext}
          disabled={!isComplete}
          className="w-full mt-4"
        >
          Lanjut
        </Button>

        <div className="mt-12">
          <Stepper currentStep={5} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}