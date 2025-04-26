import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState } from 'react';

export default function StepKelompokVI_InputFaktor() {
  const { dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [pembobotanUtama, setPembobotanUtama] = useState(0);
  const [hukdisSebelumnya, setHukdisSebelumnya] = useState(0);
  const [hambatanPemeriksaan, setHambatanPemeriksaan] = useState(0);
  const [meringankan, setMeringankan] = useState(0);

  const handleNext = () => {
    const nilaiAkhir = 60 + pembobotanUtama + hukdisSebelumnya + hambatanPemeriksaan - meringankan;
    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir });

    navigate('/step/hasil-kelompok-vi');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Pembobotan Kelompok VI
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          {/* Faktor Pembobotan Utama */}
          <label>
            Dampak Pelanggaran:
            <select value={pembobotanUtama} onChange={(e) => setPembobotanUtama(parseFloat(e.target.value))} className="p-2 border rounded w-full">
              <option value="0">Tidak berdampak</option>
              <option value="15">Berdampak pada Unit Kerja</option>
              <option value="30">Berdampak pada Instansi / Tersangka</option>
            </select>
          </label>

          {/* Faktor Tambahan - Hukdis Sebelumnya */}
          <label>
            Riwayat Hukuman Disiplin:
            <select value={hukdisSebelumnya} onChange={(e) => setHukdisSebelumnya(parseFloat(e.target.value))} className="p-2 border rounded w-full">
              <option value="0">Belum pernah dijatuhi hukdis</option>
              <option value="2.5">Pernah satu kali dijatuhi hukdis</option>
              <option value="5">Lebih dari satu kali dijatuhi hukdis</option>
            </select>
          </label>

          {/* Faktor Tambahan - Hambatan Pemeriksaan */}
          <label>
            Hambatan dalam Pemeriksaan:
            <select value={hambatanPemeriksaan} onChange={(e) => setHambatanPemeriksaan(parseFloat(e.target.value))} className="p-2 border rounded w-full">
              <option value="0">Tidak ada hambatan</option>
              <option value="2.5">Bersikap tidak kooperatif</option>
              <option value="5">Menghalangi/menghilangkan bukti</option>
            </select>
          </label>

          {/* Faktor Meringankan */}
          <label>
            Faktor Meringankan:
            <select value={meringankan} onChange={(e) => setMeringankan(parseFloat(e.target.value))} className="p-2 border rounded w-full">
              <option value="0">Tidak ada faktor meringankan</option>
              <option value="5">Bersikap kooperatif</option>
              <option value="10">Inisiator pengungkapan pelanggaran</option>
            </select>
          </label>

          <Button onClick={handleNext}>
            Hitung Nilai Akhir
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
