import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { useMPJHD } from '../context/MPJHDContext';
import { tentukanNilaiPokok } from '../utils/tentukanNilaiPokok';

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function StepKelompokIII_Check() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [jawabanAdaKerugian, setJawabanAdaKerugian] = useState(null);

  const handleJawabanKerugian = (jawaban) => {
    if (jawaban === 'tidak') {
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Umum' });

      const nilaiPokok = tentukanNilaiPokok({
        pasal: state.pasalUtama,
        kelompok: 'III',
        dampak: state.dampak,
        jabatan: state.jabatan,
      });
      dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok });

      navigate('/step/6');
    } else if (jawaban === 'ya') {
      setJawabanAdaKerugian('ya');
    }
  };

  const handlePilihTipe = (tipe) => {
    if (tipe === 'individual') {
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Khusus Individual' });
    } else if (tipe === 'bersama') {
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Khusus Bersama' });
    }

    const nilaiPokok = tentukanNilaiPokok({
      pasal: state.pasalUtama,
      kelompok: 'III',
      dampak: state.dampak,
      jabatan: state.jabatan,
    });

    dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok });

    navigate('/step/5');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Verifikasi Kelompok III
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">

          {/* Pertanyaan pertama: Ada kerugian? */}
          {jawabanAdaKerugian === null && (
            <>
              <p className="text-gray-700 dark:text-gray-200">
                Apakah dalam pelanggaran ini terdapat penerimaan uang dan/atau kerugian negara/pihak lain?
              </p>
              <RadioGroup onChange={handleJawabanKerugian} className="flex flex-col gap-4 mt-4">
                <RadioGroup.Option value="ya">
                  {({ active, checked }) => (
                    <div className={`cursor-pointer rounded-md border p-3 ${checked ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}>
                      Ada
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="tidak">
                  {({ active, checked }) => (
                    <div className={`cursor-pointer rounded-md border p-3 ${checked ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}>
                      Tidak Ada
                    </div>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </>
          )}

          {/* Kalau user jawab Ada ➔ Pilih Individual / Bersama */}
          {jawabanAdaKerugian === 'ya' && (
            <>
              <p className="text-gray-700 dark:text-gray-200">
                Apakah pelanggaran dilakukan secara individual atau bersama-sama?
              </p>
              <RadioGroup onChange={handlePilihTipe} className="flex flex-col gap-4 mt-4">
                <RadioGroup.Option value="individual">
                  {({ active, checked }) => (
                    <div className={`cursor-pointer rounded-md border p-3 ${checked ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}>
                      Individual
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="bersama">
                  {({ active, checked }) => (
                    <div className={`cursor-pointer rounded-md border p-3 ${checked ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'}`}>
                      Bersama-sama
                    </div>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </>
          )}

          <BackButton className="mt-6" />
        </div>
      </Card>

      <Stepper currentStep={4} />
    </PageWrapper>
  );
}
