import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { tentukanNilaiPokok } from '../utils/tentukanNilaiPokok'; // 🔥 penting import!

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function StepKelompokIII_Check() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [jawabanAdaKerugian, setJawabanAdaKerugian] = useState(null);

  const handleJawabanKerugian = (jawaban) => {
    if (jawaban === 'tidak') {
      // Tidak ada kerugian ➔ Kelompok III Umum
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Umum' });

      // Hitung nilai pokok langsung
      const nilaiPokok = tentukanNilaiPokok({
        pasal: state.pasalUtama,
        kelompok: 'III',
        dampak: state.dampak,
        jabatan: state.jabatan,
      });
      dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok });

      navigate('/step/6'); // Langsung ke faktor pembobotan tambahan
    } else {
      // Ada kerugian ➔ lanjut pilih individual atau bersama
      setJawabanAdaKerugian('ya');
    }
  };

  const handlePilihTipe = (tipe) => {
    if (tipe === 'individual') {
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Khusus Individual' });
    } else if (tipe === 'bersama') {
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Khusus Bersama' });
    }

    // Hitung nilai pokok berdasarkan pasal
    const nilaiPokok = tentukanNilaiPokok({
      pasal: state.pasalUtama,
      kelompok: 'III', // Tetap kelompok III untuk penentuan nilai pokok
      dampak: state.dampak,
      jabatan: state.jabatan,
    });

    dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok });

    navigate('/step/5'); // Lanjut ke input faktor utama
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
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Button
                  onClick={() => handleJawabanKerugian('ya')}
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  Ada
                </Button>
                <Button
                  onClick={() => handleJawabanKerugian('tidak')}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                >
                  Tidak Ada
                </Button>
              </div>
            </>
          )}

          {/* Kalau user jawab Ada ➔ Pilih Individual / Bersama */}
          {jawabanAdaKerugian === 'ya' && (
            <>
              <p className="text-gray-700 dark:text-gray-200">
                Apakah pelanggaran dilakukan secara individual atau bersama-sama?
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Button
                  onClick={() => handlePilihTipe('individual')}
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  Individual
                </Button>
                <Button
                  onClick={() => handlePilihTipe('bersama')}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                >
                  Bersama-sama
                </Button>
              </div>
            </>
          )}

          <BackButton className="mt-6" />
        </div>
      </Card>

      <Stepper currentStep={4} />
    </PageWrapper>
  );
}
