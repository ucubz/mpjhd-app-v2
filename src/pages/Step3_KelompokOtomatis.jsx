import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useEffect, useState } from 'react';
import { determineKelompok } from '../utils/determineKelompok';

export default function Step3_KelompokOtomatis() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();
  const [kelompok, setKelompok] = useState('');

  useEffect(() => {
    if (!state.pasalUtama) {
      return;
    }

    const hasilKelompok = determineKelompok(state.pasalUtama);
    setKelompok(hasilKelompok);
    dispatch({ type: 'SET', key: 'kelompok', value: hasilKelompok });
  }, [state.pasalUtama, dispatch]);

  const handleNext = () => {
    if (!kelompok) {
      alert('Kelompok belum ditentukan.');
      return;
    }

    if (kelompok === 'I') {
      navigate('/step/kelompok-i');
    } else if (kelompok === 'III') {
      navigate('/step/kelompok-iii-check');
    } else {
      // Kelompok II, IV, V, VI langsung ke Step4
      navigate('/step/4');
    }
  };

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Kelompokkan Pelanggaran (Otomatis)
      </h1>

      <Card className="flex flex-col gap-6 p-4 sm:p-6">
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Berdasarkan pasal utama, pelanggaran dikelompokkan ke:
          </p>

          <p className="text-xl font-bold text-primary dark:text-primary-dark mt-2">
            {kelompok ? kelompok : 'Sedang menentukan kelompok...'}
          </p>

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={!kelompok}
            >
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={3} />
    </PageWrapper>
  );
}
