import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import { konversiGrade } from '../utils/mpjhdHelper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';

export default function StepHasilKelompokI() {
  const { state } = useMPJHD();
  const navigate = useNavigate();
  const { nilaiAkhir } = state;

  const { grade, hukuman } = konversiGrade(nilaiAkhir);

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold mb-8 md:text-3xl">
        Hasil Akhir Kelompok I
      </h1>

      <Card className="flex flex-col gap-6 p-6 text-center">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Nilai Akhir: <span className="font-semibold">{nilaiAkhir}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Grade Hukuman: <span className="font-semibold">{grade}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Jenis Hukuman Disiplin: <span className="font-semibold">{hukuman}</span>
          </p>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <ResetButton>
            Kembali
          </ResetButton>
        </div>
        
      </Card>
    </PageWrapper>
  );
}
