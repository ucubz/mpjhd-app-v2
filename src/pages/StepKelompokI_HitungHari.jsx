import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState } from 'react';

export default function StepKelompokI_HitungHari() {
  const { dispatch } = useMPJHD();
  const navigate = useNavigate();
  const [jumlahHari, setJumlahHari] = useState('');

  const handleNext = () => {
    const hari = parseInt(jumlahHari, 10);
    if (isNaN(hari) || hari <= 0) {
      alert('Masukkan jumlah hari tidak masuk kerja yang valid.');
      return;
    }

    // Tentukan nilai akhir berdasarkan jumlah hari
    let nilaiAkhir = 0;
    if (hari === 3) nilaiAkhir = 10;
    else if (hari >= 4 && hari <= 6) nilaiAkhir = 20;
    else if (hari >= 7 && hari <= 10) nilaiAkhir = 30;
    else if (hari >= 11 && hari <= 13) nilaiAkhir = 40;
    else if (hari >= 14 && hari <= 16) nilaiAkhir = 50;
    else if (hari >= 17 && hari <= 20) nilaiAkhir = 60;
    else if (hari >= 21 && hari <= 24) nilaiAkhir = 70;
    else if (hari >= 25 && hari <= 27) nilaiAkhir = 80;
    else if (hari >= 28) nilaiAkhir = 90; // 28 hari atau lebih = 90

    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir });

    // Lanjut ke halaman hasil
    navigate('/step/hasil-kelompok-i');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Jumlah Hari Tidak Masuk Kerja
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <input
            type="number"
            className="p-2 border rounded"
            placeholder="Masukkan jumlah hari"
            value={jumlahHari}
            onChange={(e) => setJumlahHari(e.target.value)}
          />

          <Button onClick={handleNext}>
            Lanjutkan
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
