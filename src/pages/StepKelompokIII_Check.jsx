// src/pages/StepKelompokIII_Check.jsx

import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function StepKelompokIII_Check() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const handleJawaban = (jawaban) => {
    if (jawaban === 'ya') {
      // Kalau ada penerimaan/kerugian ➔ Kelompok III Khusus
      // Nanti setelah ini bisa pilih apakah Individual atau Bersama di step berikutnya
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Khusus Individual' }); // default dulu Individual, nanti bisa dipilih lebih lanjut
      navigate('/step/5');
    } else {
      // Kalau tidak ada ➔ Kelompok III Umum
      dispatch({ type: 'SET', key: 'kelompok', value: 'III Umum' });
      navigate('/step/6');
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Verifikasi Kelompok III
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Apakah dalam pelanggaran ini terdapat penerimaan uang dan/atau kerugian negara/pihak lain?
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button
              onClick={() => handleJawaban('ya')}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              Ada (Masuk III Khusus)
            </Button>
            <Button
              onClick={() => handleJawaban('tidak')}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
            >
              Tidak Ada (Masuk III Umum)
            </Button>
          </div>

          <BackButton className="mt-6" />
        </div>
      </Card>

      <Stepper currentStep={4} /> {/* atau currentStep sesuai urutan flowmu */}
    </PageWrapper>
  );
}
