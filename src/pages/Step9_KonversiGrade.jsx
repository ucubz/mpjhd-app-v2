import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';

export default function Step9_GradeHukuman() {
  const navigate = useNavigate();
  const { state } = useMPJHD();

  const handleNext = () => {
    navigate('/step/10');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Grade Hukuman Disiplin
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Berdasarkan perhitungan nilai akhir:
          </p>

          <p className="text-3xl font-bold text-primary dark:text-primary-dark">
            {state.grade || '-'}
          </p>

          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {state.jenisHukuman || '-'}
          </p>

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={9} />
    </PageWrapper>
  );
}
