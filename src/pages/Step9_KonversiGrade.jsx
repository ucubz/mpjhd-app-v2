// src/pages/Step9_KonversiGrade.jsx

import { useEffect } from 'react'; // Jangan lupa import!
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import Stepper from '../components/Stepper';
import { konversiGrade } from '../utils/konversiGrade';

export default function Step9_KonversiGrade() {
  const { state, dispatch } = useMPJHD(); // <--- dispatch harus diambil juga
  const navigate = useNavigate();

  useEffect(() => {
    if (state.nilaiAkhir === undefined || state.nilaiAkhir === null) return;

    const { grade, jenisHukuman } = konversiGrade(state.nilaiAkhir);

    dispatch({ type: 'SET', key: 'grade', value: grade });
    dispatch({ type: 'SET', key: 'jenisHukuman', value: jenisHukuman });
  }, [state.nilaiAkhir, dispatch]); // depend hanya pada nilaiAkhir

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

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Grade Hukuman</p>
            <p className="text-4xl font-bold text-primary dark:text-primary-dark">
              {state.grade || '-'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Jenis Hukuman Disiplin</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {state.jenisHukuman || '-'}
            </p>
          </div>

          <Button onClick={handleNext} className="w-full mt-4">
            Lanjut ke Hasil Akhir
          </Button>

        </div>
      </Card>

      <Stepper currentStep={9} />
    </PageWrapper>
  );
}
