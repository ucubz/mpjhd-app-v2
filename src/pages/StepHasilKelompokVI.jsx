import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import { konversiGrade } from '../utils/mpjhdHelper'; // 🔥 Pakai helper resmi

export default function StepHasilKelompokVI() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const { nilaiAkhir } = state;

  const { grade, hukuman } = konversiGrade(nilaiAkhir);

  const handleReset = () => {
    const confirmReset = window.confirm('Yakin ingin mengulang dari awal? Semua data akan dihapus.');
    if (confirmReset) {
      dispatch({ type: 'RESET' });
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Akhir Kelompok VI
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

          <Button onClick={handleReset} className="w-full mt-4 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
            Ulang dari Awal
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
