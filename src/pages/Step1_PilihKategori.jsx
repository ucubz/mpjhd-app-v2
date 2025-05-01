// Step 1 - Pilih kategori
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';

const pilihan = [
  { label: 'Pasal 3 - Kewajiban', value: 'pasal3' },
  { label: 'Pasal 4 - Larangan', value: 'pasal4' },
  { label: 'Pasal 5 - Larangan', value: 'pasal5' },
  { label: 'Izin Perkawinan atau Perceraian', value: 'izin' },
];

export default function Step1_PilihKategori() {
  const navigate = useNavigate();
  const { dispatch } = useMPJHD();

  const handleSelect = (val) => {
    dispatch({ type: 'SET', field: 'jenisPilihanUtama', value: val });
    if (val === 'izin') {
      dispatch({ type: 'SET', field: 'kelompok', value: 'VI' });
      navigate('/step/3');
    } else {
      navigate('/step/2');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          if (confirm('Yakin ingin mereset dan kembali ke awal?')) {
            navigate('/step/1');
            dispatch({ type: 'RESET' });
          }
        }}
        className="text-red-600 font-semibold mb-4"
      >
        Reset
      </button>

      <h2 className="text-xl font-bold mb-6">Pilih Jenis Pelanggaran</h2>
      <RadioGroup onChange={handleSelect}>
        <div className="space-y-3">
          {pilihan.map((item) => (
            <RadioGroup.Option
              key={item.value}
              value={item.value}
              className={({ checked }) =>
                `p-4 rounded-xl border cursor-pointer transition-all ${
                  checked
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                }`
              }
            >
              {({ checked }) => (
                <div className="flex items-center gap-3">
                  {checked && (
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                  )}
                  <span>{item.label}</span>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-12">
        <Stepper currentStep={1} totalSteps={7} />
      </div>
    </div>
  );
}