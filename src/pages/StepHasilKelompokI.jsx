import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import { konversiGrade } from '../utils/mpjhdHelper'; // 🔥 Import helper resmi

export default function StepHasilKelompokI() {
  const { state } = useMPJHD();
  const navigate = useNavigate();
  const { nilaiAkhir } = state;

  const { grade, hukuman } = konversiGrade(nilaiAkhir);

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Akhir Kelompok I
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Nilai Akhir: <strong>{nilaiAkhir}</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Grade Hukuman: <strong>{grade}</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Jenis Hukuman Disiplin: <strong>{hukuman}</strong>
          </p>

          <Button onClick={() => navigate('/')}>
            Kembali ke Awal
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
