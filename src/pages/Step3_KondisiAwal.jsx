import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';

export default function Step3_KondisiAwal() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const isKelompokII = state.kelompok === 'II';
  const isKelompokVI = state.kelompok === 'VI';
  const isKelompokIII = state.kelompok?.startsWith('III');
  const isPasal4e = state.pasalUtama?.includes('Pasal 4 huruf e');

  const dampakOptions = isKelompokII
    ? ['Unit Kerja', 'Instansi', 'Negara']
    : ['Tidak Berdampak', 'Unit Kerja', 'Instansi/Tersangka'];

  const jabatanOptions = [
    'Pejabat Administrator',
    'Pejabat Fungsional',
    'Pejabat Pimpinan Tinggi',
    'Pejabat lainnya',
  ];

  const showDampak = isKelompokII || isKelompokVI;
  const showJabatan = isPasal4e;
  const showKerugian = isKelompokIII;

  const nextStep = () => navigate('/step/4');

  const isComplete =
    (!showDampak || !!state.dampak) &&
    (!showJabatan || !!state.jabatan) &&
    (!showKerugian || typeof state.adaKerugian === 'boolean');

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

      <h2 className="text-xl font-bold mb-6">Kondisi Awal</h2>

      {showDampak && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Dampak pelanggaran:</p>
          <RadioGroup
            value={state.dampak}
            onChange={(val) => {
              dispatch({ type: 'SET', field: 'dampak', value: val });
              if (!showJabatan && !showKerugian) nextStep();
            }}
          >
            <div className="space-y-2">
              {dampakOptions.map((val) => (
                <RadioGroup.Option key={val} value={val}
                  className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>{val}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {showJabatan && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Jabatan Pelaku:</p>
          <RadioGroup
            value={state.jabatan}
            onChange={(val) => {
              dispatch({ type: 'SET', field: 'jabatan', value: val });
              if (!showDampak && !showKerugian) nextStep();
            }}
          >
            <div className="space-y-2">
              {jabatanOptions.map((val) => (
                <RadioGroup.Option key={val} value={val}
                  className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>{val}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {showKerugian && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Apakah terdapat kerugian negara/pihak lain?</p>
          <RadioGroup
            value={state.adaKerugian}
            onChange={(val) => {
              dispatch({ type: 'SET', field: 'adaKerugian', value: val });
              if (!showDampak && !showJabatan) nextStep();
            }}
          >
            <div className="space-y-2">
              {[{ label: 'Ya', value: true }, { label: 'Tidak', value: false }].map(({ label, value }) => (
                <RadioGroup.Option key={label} value={value}
                  className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>{label}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {isComplete && (showDampak && showJabatan) && (
        <button
          onClick={nextStep}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Lanjut
        </button>
      )}

      <div className="mt-12">
        <Stepper currentStep={3} totalSteps={7} />
        <button
          onClick={() => navigate('/step/2')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}