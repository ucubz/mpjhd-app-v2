import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton'; // 🔥 Tambah import BackButton
import Stepper from '../components/Stepper';
import { konversiGrade } from '../utils/konversiGrade';

export default function Step9_KonversiGrade() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.nilaiAkhir === undefined || state.nilaiAkhir === null) return;

    const { grade, jenisHukuman } = konversiGrade(state.nilaiAkhir);

    dispatch({ type: 'SET', key: 'grade', value: grade });
    dispatch({ type: 'SET', key: 'jenisHukuman', value: jenisHukuman });
  }, [state.nilaiAkhir, dispatch]);

  const handleNext = () => {
    navigate('/step/10');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Konversi Grade Hukuman
      </h1>

      <Card>
        <div className="flex flex-col items-center gap-6">

          {/* Tampil Grade */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Grade Hukuman</p>
            <p className="text-4xl font-bold text-primary dark:text-primary-dark">
              {state.grade || '-'}
            </p>
          </div>

          {/* Tampil Jenis Hukuman */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Jenis Hukuman Disiplin</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {state.jenisHukuman || '-'}
            </p>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton />
            <Button className="w-60" onClick={handleNext}>
              Lanjut ke Hasil Akhir
            </Button>
          </div>

        </div>
      </Card>

      <Stepper currentStep={9} />
    </PageWrapper>
  );
}
