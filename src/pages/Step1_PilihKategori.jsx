// Step 1 - Pilih kategori
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import StepLayout from '../components/StepLayout';
import OptionList from '../components/OptionList';

const pilihan = [
  { label: 'Pasal 3 - Kewajiban', value: 'pasal3' },
  { label: 'Pasal 4 - Kewajiban', value: 'pasal4' },
  { label: 'Pasal 5 - Larangan', value: 'pasal5' },
  { label: 'Izin Perkawinan atau Perceraian', value: 'izin' },
];

export default function Step1_PilihKategori() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();
  const [dipilih, setDipilih] = useState(state.jenisPilihanUtama || null);

  const handleNext = () => {
    // Pilihan sama dengan sebelumnya: jangan hapus isian yang sudah ada
    if (dipilih === state.jenisPilihanUtama) {
      navigate(dipilih === 'izin' ? '/step/3' : '/step/2');
      return;
    }
    if (dipilih === 'izin') {
      dispatch({ type: 'PILIH_KATEGORI', value: dipilih, kelompok: 'VI', pasalUtama: 'terkait Perkawinan/Perceraian' });
      navigate('/step/3');
    } else {
      dispatch({ type: 'PILIH_KATEGORI', value: dipilih });
      navigate('/step/2');
    }
  };

  return (
    <StepLayout
      step={1}
      title="Pilih Jenis Pelanggaran"
      subtitle="Pilih salah satu, lalu tekan Lanjut."
      hideBack
      onNext={handleNext}
      nextDisabled={!dipilih}
    >
      <OptionList value={dipilih} onChange={setDipilih} options={pilihan} label="Jenis pelanggaran" />
    </StepLayout>
  );
}
