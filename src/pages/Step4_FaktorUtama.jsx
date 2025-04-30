// Step 4 - Faktor utama
import { useEffect } from 'react';
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
    kelompok === 'III Khusus Bersama' || kelompok === 'III Khusus Individu';
  const showKerugianIV = kelompok === 'IV';
  const showReputasiVI = kelompok === 'VI';

  useEffect(() => {
    const noFaktorToShow =
      !showPeran && !showKerugian && !showKerugianIV && !showReputasiVI;
    if (noFaktorToShow) {
      navigate('/step/5');
    }
  }, [navigate, showPeran, showKerugian, showKerugianIV, showReputasiVI]);

  const handleNext = () => navigate('/step/5');

  const updateFaktor = (field, value) => {
    dispatch({
      type: 'SET_FAKTOR_UTAMA',
      field,
      value,
    });

    let nilai = 0;

    if (field === 'peran') {
      if (value === 'Pasif') nilai = 2;
      if (value === 'Aktif') nilai = 5;
      if (value === 'Inisiator') nilai = 10;
    }

    if (field === 'jumlahKerugian') {
      if (value === '< 1 juta') nilai = 2;
      if (value === '1 - 10 juta') nilai = 5;
      if (value === '> 10 juta') nilai = 10;
    }

    if (field === 'reputasi') {
      if (value === 'Rendah') nilai = 2;
      if (value === 'Sedang') nilai = 5;
      if (value === 'Tinggi') nilai = 10;
    }

    dispatch({
      type: 'SET_FAKTOR_UTAMA',
      field: 'nilai',
      value: nilai,
    });

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
              {['< 1 juta', '1 - 10 juta', '> 10 juta'].map((val) => (
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

      {showReputasiVI && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Dampak terhadap reputasi instansi:</p>
          <RadioGroup
            value={state.faktorUtama.reputasi}
            onChange={(val) => updateFaktor('reputasi', val)}
          >
            <div className="space-y-2">
              {['Rendah', 'Sedang', 'Tinggi'].map((val) => (
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
    </div>
  );
}