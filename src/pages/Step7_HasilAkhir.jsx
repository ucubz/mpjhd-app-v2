import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';

import { konversiGrade } from '../utils_v2/konversiGrade';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';
import { hitungFaktorTambahanRinci } from '../utils_v2/hitungFaktorTambahan';

export default function Step7_HasilAkhir() {
  const { state } = useMPJHD();
  const navigate = useNavigate();

  const kelompok = String(state.kelompok || '').toUpperCase();
  const tipeKelompokIII = state.tipeKelompokIII || '';

  const {
    nilaiPokok,
    nilaiUtama,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiAkhir,
  } = hitungNilaiAkhir(state);

  const hasilGrade = konversiGrade(nilaiAkhir);

  const hasil = {
    nilaiPokok,
    nilaiUtama,
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

  const tampilkanTabelRincian =
    kelompok === 'III' && ['individu', 'umum'].includes(tipeKelompokIII);

  const rincianTambahan = tampilkanTabelRincian
    ? hitungFaktorTambahanRinci(
        state.faktorPembobotan,
        `III_${tipeKelompokIII.toUpperCase()}`
      )
    : {};

  const faktorMeringankan = state.faktorMeringankan || {};
  const rincianMeringankan = [];

  if (faktorMeringankan.kooperatif) {
    rincianMeringankan.push({ label: 'Kooperatif saat diperiksa', nilai: 5 });
  }
  if (faktorMeringankan.inisiator) {
    rincianMeringankan.push({ label: 'Pelaku adalah inisiator', nilai: 10 });
  }

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

        {tampilkanTabelRincian && (
          <>
            <h3 className="text-lg font-semibold mb-2">
              Rincian Faktor Tambahan (Kelompok III - {tipeKelompokIII})
            </h3>
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 mb-6">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border px-2 py-1">Faktor</th>
                  <th className="border px-2 py-1">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rincianTambahan).map(([label, nilai]) => (
                  <tr key={label}>
                    <td className="border px-2 py-1">
                      {label.replace(/([A-Z])/g, ' $1')}
                    </td>
                    <td className="border px-2 py-1">{nilai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {rincianMeringankan.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Rincian Faktor Meringankan</h3>
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 mb-6">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border px-2 py-1">Faktor</th>
                  <th className="border px-2 py-1">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {rincianMeringankan.map((item) => (
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
