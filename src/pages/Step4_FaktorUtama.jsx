// Step 4 - Faktor utama
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';

export default function Step4_FaktorUtama() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = state.kelompok;

  const showPeran = kelompok === 'III Khusus Bersama';
  const showKerugian =
    kelompok === 'III Khusus Bersama' ||
    kelompok === 'III Khusus Individu';
  const showKerugianIV = kelompok === 'IV';
  const showReputasiVI = kelompok === 'VI';

  const isComplete =
    (!showPeran || state.faktorUtama.peran) &&
    ((!showKerugian && !showKerugianIV && !showReputasiVI) || state.faktorUtama.jumlahKerugian || state.faktorUtama.reputasi);

  const handleNext = () => navigate('/step/5');

  const updateFaktor = (field, value) => {
    dispatch({
      type: 'SET_FAKTOR_UTAMA',
      field,
      value,
    });
    // auto next jika hanya satu
    if (
      (!showPeran && (showKerugian || showKerugianIV || showReputasiVI)) === false
    ) {
      handleNext();
    }
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

      <h2 className="text-xl font-bold mb-6">Faktor Pembobotan Utama</h2>

      {showPeran && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Peran Pelaku:</p>
          <RadioGroup
            value={state.faktorUtama.peran}
            onChange={(val) => updateFaktor('peran', val)}
          >
            <div className="space-y-2">
              {['Pasif', 'Aktif', 'Inisiator'].map((val) => (
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

      {(showKerugian || showKerugianIV) && (
        <div className="mb-6">
          <p className="font-semibold mb-2">
            {kelompok === 'IV'
              ? 'Kerugian bagi pihak yang dilayani:'
              : 'Jumlah uang yang diterima atau kerugian negara:'}
          </p>
          <RadioGroup
            value={state.faktorUtama.jumlahKerugian}
            onChange={(val) => updateFaktor('jumlahKerugian', val)}
          >
            <div className="space-y-2">
              {[
                { label: '≤ Rp10 juta', value: 7.5 },
                { label: '> Rp10 juta s.d. 50 juta', value: 15 },
                { label: '> Rp50 juta s.d. 100 juta', value: 22.5 },
                { label: '> Rp100 juta', value: 30 },
              ].map(({ label, value }) => (
                <RadioGroup.Option key={value} value={value}
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

      {showReputasiVI && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Dampak terhadap reputasi / tugas:</p>
          <RadioGroup
            value={state.faktorUtama.reputasi}
            onChange={(val) => updateFaktor('reputasi', val)}
          >
            <div className="space-y-2">
              {[
                'Tidak berdampak',
                'Berdampak pada unit kerja',
                'Berdampak pada instansi / tersangka',
              ].map((val) => (
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

      {isComplete && showPeran && (
        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Lanjut
        </button>
      )}

      <div className="mt-12">
        <Stepper currentStep={4} totalSteps={7} />
        <button
          onClick={() => navigate('/step/3')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}