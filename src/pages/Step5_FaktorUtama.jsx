import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

import {
  hitungNilaiPokokIIIKhususIndividual,
  hitungNilaiPokokIIIKhususBersama,
  hitungNilaiPokokIV,
  hitungNilaiPokokVI
} from '../utils/hitungNilaiPokok';

export default function Step5_FaktorUtama() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [inputKerugian, setInputKerugian] = useState('');

  const handleSubmit = (extraAction = null) => {
    if (state.kelompok === 'III Khusus Individual') {
      const faktorUtama = hitungNilaiPokokIIIKhususIndividual(parseInt(inputKerugian));
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    if (state.kelompok === 'III Khusus Bersama') {
      const faktorPeran = hitungNilaiPokokIIIKhususBersama(extraAction);
      dispatch({ type: 'SET', key: 'faktorPeran', value: faktorPeran });

      const jumlahKerugian = parseInt(inputKerugian);
      let faktorTambahanUang = 0;
      if (jumlahKerugian <= 10000000) faktorTambahanUang = 2.5;
      else if (jumlahKerugian <= 50000000) faktorTambahanUang = 5;
      else if (jumlahKerugian <= 100000000) faktorTambahanUang = 7.5;
      else faktorTambahanUang = 10;

      dispatch({ type: 'SET', key: 'faktorTambahanUang', value: faktorTambahanUang });
    }

    if (state.kelompok === 'IV') {
      const faktorUtama = hitungNilaiPokokIV(parseInt(inputKerugian));
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    if (state.kelompok === 'VI') {
      const faktorUtama = hitungNilaiPokokVI(extraAction);
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    navigate('/step/6');
  };

  const renderInput = () => {
    switch (state.kelompok) {
      case 'II':
      case 'III Umum':
      case 'V':
        return (
          <div className="flex flex-col gap-6">
            <p className="text-gray-700 dark:text-gray-200 text-center">
              Tidak ada faktor utama yang perlu diisi untuk kelompok ini.
            </p>
            <div className="flex justify-between gap-4 mt-6">
              <BackButton />
              <button
                onClick={() => navigate('/step/6')}
                className="w-24 p-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                Lanjut
              </button>
            </div>
          </div>
        );

      case 'III Khusus Individual':
      case 'IV':
        return (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Jumlah Kerugian (Rp)
              </label>
              <input
                type="number"
                value={inputKerugian}
                onChange={(e) => setInputKerugian(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Masukkan jumlah kerugian"
              />
            </div>

            {/* Tombol navigasi */}
            <div className="flex justify-between gap-4 mt-6">
              <BackButton />
              <button
                onClick={() => handleSubmit()}
                disabled={!inputKerugian}
                className={`w-24 p-2 rounded-md text-white ${
                  inputKerugian
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Lanjut
              </button>
            </div>
          </>
        );

      case 'III Khusus Bersama':
        return (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Pilih Peran Pelaku:
              </label>
              <RadioGroup onChange={(val) => handleSubmit(val)}>
                <div className="flex flex-col gap-2 mt-2">
                  {['Pasif', 'Aktif', 'Inisiator'].map((item) => (
                    <RadioGroup.Option
                      key={item}
                      value={item}
                      className={({ checked }) =>
                        `cursor-pointer p-3 rounded-md border text-sm ${
                          checked
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                        }`
                      }
                    >
                      {item}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Jumlah Kerugian (Rp)
              </label>
              <input
                type="number"
                value={inputKerugian}
                onChange={(e) => setInputKerugian(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Masukkan jumlah kerugian"
              />
            </div>

            {/* Back button */}
            <div className="flex justify-start gap-4 mt-6">
              <BackButton />
            </div>
          </>
        );

      case 'VI':
        return (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Pilih Dampak terhadap Reputasi:
              </label>
              <RadioGroup onChange={(val) => handleSubmit(val)}>
                <div className="flex flex-col gap-2 mt-2">
                  {[
                    'Tidak Berdampak',
                    'Unit Kerja',
                    'Instansi/Tersangka'
                  ].map((item) => (
                    <RadioGroup.Option
                      key={item}
                      value={item}
                      className={({ checked }) =>
                        `cursor-pointer p-3 rounded-md border text-sm ${
                          checked
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                        }`
                      }
                    >
                      {item}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Back button */}
            <div className="flex justify-start gap-4 mt-6">
              <BackButton />
            </div>
          </>
        );

      default:
        return (
          <p className="text-red-600 dark:text-red-400">
            Kelompok tidak dikenali. Silakan kembali dan cek pilihan.
          </p>
        );
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Input Faktor Utama
      </h1>

      <Card>
        <div className="flex flex-col gap-4 mt-6">
          {renderInput()}
        </div>
      </Card>

      <Stepper currentStep={5} />
    </PageWrapper>
  );
}
