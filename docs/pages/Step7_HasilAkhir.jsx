import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';

import { tentukanNilaiPokok } from '../utils_v2/tentukanNilaiPokok';
import { hitungFaktorTambahan } from '../utils_v2/hitungFaktorTambahan';
import { hitungFaktorMeringankan } from '../utils_v2/hitungFaktorMeringankan';
import { konversiGrade } from '../utils_v2/konversiGrade';
import { hitungNilaiKelompokI } from '../utils_v2/hitungNilaiKelompokI';

export default function Step7_HasilAkhir() {
  const { state } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = String(state.kelompok || '').toUpperCase();

  const nilaiPokok =
    kelompok === 'I'
      ? hitungNilaiKelompokI(state.jumlahHariTidakMasuk || 0)
      : tentukanNilaiPokok(
          state.kelompok,
          state.pasalUtama,
          state.dampak || '',
          state.jabatan || ''
        );

  const nilaiTambahan = hitungFaktorTambahan(state.faktorPembobotan || {}, kelompok);
  const pengurangMeringankan = hitungFaktorMeringankan(
    state.faktorMeringankan?.kooperatif,
    state.faktorMeringankan?.inisiator
  );

  const nilaiAkhir = nilaiPokok + nilaiTambahan - pengurangMeringankan;
  const hasilGrade = konversiGrade(nilaiAkhir);

  const hasil = {
    nilaiPokok,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiAkhir,
    grade: hasilGrade.grade,
    jenisHukuman: hasilGrade.hukuman,
  };

  const renderValue = (val) => {
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (val === null || val === undefined) return '(kosong)';
    if (typeof val === 'object') return JSON.stringify(val);
    return val.toString();
  };

  const tampilkanRincian = ['II', 'III', 'III UMUM', 'III KHUSUS INDIVIDU', 'IV', 'V', 'VI'].includes(kelompok);
  const rincianTambahan = (() => {
    const { banyakPasal, hukdis, kesengajaan, hambatan } = state.faktorPembobotan || {};
    const key = kelompok.replaceAll(' ', '_').toUpperCase();
    const map = {
      II: { dua: 3.75, lebihDua: 7.5, pernahSatu: 3.75, lebihSatu: 7.5, lalai: 3.75, sengaja: 7.5, tidakKooperatif: 3.75, menghalangi: 7.5 },
      III_UMUM: { dua: 2.5, lebihDua: 5, pernahSatu: 15, lalai: 2.5, sengaja: 5, tidakKooperatif: 2.5, menghalangi: 5 },
      III_KHUSUS_INDIVIDU: { dua: 1.25, lebihDua: 2.5, pernahSatu: 1.25, lebihSatu: 2.5, lalai: 1.25, sengaja: 2.5, tidakKooperatif: 1.25, menghalangi: 2.5 },
      IV: { dua: 1.25, lebihDua: 2.5, pernahSatu: 1.25, lebihSatu: 2.5, lalai: 1.25, sengaja: 2.5, tidakKooperatif: 1.25, menghalangi: 2.5 },
      V: { dua: 3.75, lebihDua: 7.5, pernahSatu: 3.75, lebihSatu: 7.5, lalai: 3.75, sengaja: 7.5, tidakKooperatif: 3.75, menghalangi: 7.5 },
      VI: { pernahSatu: 2.5, lebihSatu: 5, tidakKooperatif: 2.5, menghalangi: 5 },
    }[key] || {};

    return [
      { label: 'Banyaknya pasal', nilai: map[banyakPasal] || 0 },
      { label: 'Riwayat hukuman disiplin', nilai: map[hukdis] || 0 },
      { label: 'Faktor kesengajaan', nilai: map[kesengajaan] || 0 },
      { label: 'Hambatan pemeriksaan', nilai: map[hambatan] || 0 },
    ];
  })();

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 6" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Debug: Perhitungan Nilai</h2>

        <table className="w-full text-sm border border-gray-300 dark:border-gray-600 mb-6">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border px-2 py-1">Nama</th>
              <th className="border px-2 py-1">Isi</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(hasil).map(([key, val]) => (
              <tr key={key}>
                <td className="border px-2 py-1 font-mono">{key}</td>
                <td className="border px-2 py-1">{renderValue(val)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {tampilkanRincian && (
          <>
            <h3 className="text-lg font-semibold mb-2">Rincian Faktor Tambahan (Kelompok {kelompok})</h3>
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 mb-6">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border px-2 py-1">Faktor</th>
                  <th className="border px-2 py-1">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {rincianTambahan.map((item) => (
                  <tr key={item.label}>
                    <td className="border px-2 py-1">{item.label}</td>
                    <td className="border px-2 py-1">{item.nilai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="mt-8">
          <Stepper currentStep={7} totalSteps={7} />
          <Button className="mt-4" onClick={() => navigate('/step/6')}>
            Kembali
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
}