import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';

export default function Step4_FaktorUtama() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = state.kelompok;

  const [tipeDipilih, setTipeDipilih] = useState('');

  const isIIIKhusus = kelompok === 'III Khusus';
  const isIII_Khusus_Bersama = kelompok === 'III Khusus Bersama';
  const isIII_Khusus_Individu = kelompok === 'III Khusus Individu';

  const showPemecahIII =
    isIIIKhusus && !isIII_Khusus_Bersama && !isIII_Khusus_Individu;

  const showPeran = isIII_Khusus_Bersama;
  const showKerugian =
    isIII_Khusus_Individu || kelompok === 'IV';
  const showReputasiVI = kelompok === 'VI';

  useEffect(() => {
    const noFaktorToShow =
      !showPemecahIII && !showPeran && !showKerugian && !showReputasiVI;
    if (noFaktorToShow) {
      navigate('/step/5');
    }
  }, [showPemecahIII, showPeran, showKerugian, showReputasiVI, navigate]);

  const updateFaktor = (field, value) => {
    dispatch({ type: 'SET_FAKTOR_UTAMA', field, value });

    let nilai = 0;

    if (field === 'peran') {
      if (value === 'Pasif') nilai = 10;
      if (value === 'Aktif') nilai = 20;
      if (value === 'Inisiator') nilai = 30;
    }

    if (field === 'jumlahKerugian') {
      if (kelompok === 'III Khusus Individu' || kelompok === 'IV') {
        if (value === '< 1 juta') nilai = 7.5;
        if (value === '1 - 10 juta') nilai = 15;
        if (value === '> 10 juta') nilai = 22.5;
        if (value === '> 100 juta') nilai = 30;
      } else if (kelompok === 'III Khusus Bersama') {
        if (value === '< 1 juta') nilai = 2.5;
        if (value === '1 - 10 juta') nilai = 5;
        if (value === '> 10 juta') nilai = 7.5;
        if (value === '> 100 juta') nilai = 10;
      }
    }

    if (field === 'reputasi') {
      if (value === 'Tidak berdampak') nilai = 0;
      if (value === 'Unit Kerja') nilai = 15;
      if (value === 'Instansi/Tersangka') nilai = 30;
    }

    dispatch({
      type: 'SET_FAKTOR_UTAMA',
      field: 'nilai',
      value,
    });
  };

  const handlePilihTipe = (val) => {
    setTipeDipilih(val);
    dispatch({ type: 'SET', field: 'tipeKelompokIII', value: val });
    dispatch({
      type: 'SET',
      field: 'kelompok',
      value: val === 'bersama' ? 'III Khusus Bersama' : 'III Khusus Individu',
    });
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

      {showPemecahIII && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Apakah pelanggaran dilakukan:</p>
          <RadioGroup value={tipeDipilih} onChange={handlePilihTipe}>
            <div className="space-y-2">
              {['bersama', 'individu'].map((val) => (
                <RadioGroup.Option key={val} value={val}
                  className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>{val === 'bersama' ? 'Bersama-sama' : 'Secara Individual'}</span>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

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

      {showKerugian && (
        <div className="mb-6">
          <p className="font-semibold mb-2">
            {kelompok === 'IV'
              ? 'Kerugian bagi pihak yang dilayani:'
              : 'Jumlah uang yang diterima atau kerugian negara/pihak lain:'}
          </p>
          <RadioGroup
            value={state.faktorUtama.jumlahKerugian}
            onChange={(val) => updateFaktor('jumlahKerugian', val)}
          >
            <div className="space-y-2">
              {['< 1 juta', '1 - 10 juta', '> 10 juta', '> 100 juta'].map((val) => (
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
          <p className="font-semibold mb-2">Dampak terhadap reputasi atau pelaksanaan tugas:</p>
          <RadioGroup
            value={state.faktorUtama.reputasi}
            onChange={(val) => updateFaktor('reputasi', val)}
          >
            <div className="space-y-2">
              {['Tidak berdampak', 'Unit Kerja', 'Instansi/Tersangka'].map((val) => (
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