import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { hitungFaktorTambahanII, hitungFaktorTambahanIIIUmum, hitungFaktorTambahanIIIKhususIndividual, hitungFaktorTambahanIV, hitungFaktorTambahanV, hitungFaktorTambahanVI } from '../utils/hitungNilaiTambahan';
import { hitungFaktorMeringankan } from '../utils/hitungFaktorMeringankan';
import { hitungNilaiAkhir } from '../utils/hitungNilaiAkhir';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import Stepper from '../components/Stepper';

export default function Step8_HitungHasilMPJHD() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.kelompok) return;

    let faktorTambahan = 0;
    switch (state.kelompok) {
      case 'II':
        faktorTambahan = hitungFaktorTambahanII(state.faktorPembobotan);
        break;
      case 'III':
      case 'III Umum':
        faktorTambahan = hitungFaktorTambahanIIIUmum(state.faktorPembobotan);
        break;
      case 'III Khusus Individual':
      case 'III Khusus Bersama':
        faktorTambahan = hitungFaktorTambahanIIIKhususIndividual(state.faktorPembobotan);
        break;
      case 'IV':
        faktorTambahan = hitungFaktorTambahanIV(state.faktorPembobotan);
        break;
      case 'V':
        faktorTambahan = hitungFaktorTambahanV(state.faktorPembobotan);
        break;
      case 'VI':
        faktorTambahan = hitungFaktorTambahanVI(state.faktorPembobotan);
        break;
      default:
        faktorTambahan = 0;
    }

    const faktorMeringankan = hitungFaktorMeringankan(state.faktorMeringankan);
    const nilaiAkhir = hitungNilaiAkhir({
      ...state,
      faktorTambahan,
      faktorMeringankan,
    });

    dispatch({ type: 'SET', key: 'faktorTambahan', value: faktorTambahan });
    dispatch({ type: 'SET', key: 'faktorMeringankan', value: faktorMeringankan });
    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir });

  }, [state.kelompok, dispatch]);

  const handleNext = () => {
    navigate('/step/9');
  };

  const getJumlahPasalKalimat = () => {
    if (!state.faktorPembobotan?.banyakPasal) return '-';
    switch (state.faktorPembobotan.banyakPasal) {
      case 'satu': return 'Hanya satu pasal yang dilanggar';
      case 'dua': return 'Dua pasal yang dilanggar';
      case 'lebihDariDua': return 'Lebih dari dua pasal yang dilanggar';
      default: return '-';
    }
  };

  const getLatarBelakangKalimat = () => {
    if (!state.faktorPembobotan?.kesengajaan) return '-';
    switch (state.faktorPembobotan.kesengajaan) {
      case 'terpaksa': return 'Pelanggaran dilakukan karena terpaksa';
      case 'tidakSengaja': return 'Pelanggaran dilakukan tidak sengaja/lalai';
      case 'sengaja': return 'Pelanggaran dilakukan dengan sengaja';
      default: return '-';
    }
  };

  // 🔥 Tambahkan fungsi hitung total faktor meringankan
  const getTotalFaktorMeringankan = () => {
    if (!state.faktorMeringankan) return 0;
    let total = 0;
    if (state.faktorMeringankan.kooperatif) total += 5;
    if (state.faktorMeringankan.inisiator) total += 10;
    return total;
  };

  console.log('Nilai Pokok:', state.nilaiPokok);


  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Rekapitulasi Input MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-sm">

          {/* Rekap */}
          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p>1. Pasal yang dilanggar: {state.pasalUtama || '-'}</p>
            <p>2. Kelompok pelanggaran: Kelompok {state.kelompok || '-'}</p>
            <p>3. Jumlah pasal yang dilanggar: {getJumlahPasalKalimat()}</p>
            <p>4. Latar belakang pelanggaran: {getLatarBelakangKalimat()}</p>
            <p>5. Nilai Pokok: {state.nilaiPokok ?? '-'}</p>
            <p>6. Nilai Tambahan: {(state.faktorTambahan || 0) - getTotalFaktorMeringankan()}</p>
            <p>7. Faktor Memberatkan: {state.faktorTambahan || 0}</p>
            <p>8. Faktor Meringankan: {getTotalFaktorMeringankan()}</p>
          </div>

          {/* Tombol */}
          <Button onClick={handleNext} className="w-full">
            Lanjut ke Konversi Grade
          </Button>
        </div>
      </Card>

      <Stepper currentStep={8} />
    </PageWrapper>
  );
}
