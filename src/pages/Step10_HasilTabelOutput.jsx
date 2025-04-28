import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import { generateHTMLTable } from '../utils/generateHTMLTable';

export default function Step10_HasilTabelOutput() {
  const { state } = useMPJHD();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengulang perhitungan MPJHD? Semua data akan dihapus.')) {
      navigate('/');
      window.location.reload();
    }
  };

  const handleCopyTable = async () => {
    const html = generateHTMLTable(state.kelompok, state);

    try {
      const blob = new Blob([html], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });

      await navigator.clipboard.write([clipboardItem]);
      alert('✅ Tabel berhasil disalin dalam format tabel (HTML) ke clipboard!');
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menyalin. Coba gunakan browser terbaru (Chrome/Edge).');
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Akhir MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-8">

          {/* Tabel Ringkasan */}
          <Section title="Ringkasan Pelanggaran">
            <SummaryTable state={state} />
          </Section>

          {/* Tabel Perhitungan Angka */}
          <Section title="Rincian Perhitungan MPJHD">
            <AngkaTable state={state} kelompok={state.kelompok} />
            <div className="flex justify-end mt-4">
              <Button onClick={handleCopyTable}>
                Salin Tabel ke Clipboard
              </Button>
            </div>
          </Section>

          {/* Tombol Reset */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <BackButton />
            <Button
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Ulang dari Awal
            </Button>
          </div>

        </div>
      </Card>

      <Stepper currentStep={10} />
    </PageWrapper>
  );
}

const Section = ({ title, children }) => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
    {children}
  </section>
);

const SummaryTable = ({ state }) => (
  <div className="overflow-x-auto rounded-lg border">
    <table className="w-full text-sm text-left border-collapse">
      <tbody>
        {[
          { label: 'Kategori Pelanggaran', value: state.kategori },
          { label: 'Pasal Utama', value: state.pasalUtama },
          { label: 'Kelompok', value: state.kelompok },
          { label: 'Dampak', value: state.dampak },
          { label: 'Nilai Pokok', value: state.nilaiPokok },
          { label: 'Nilai Akhir', value: state.nilaiAkhir },
          { label: 'Grade Hukuman', value: state.grade },
          { label: 'Jenis Hukuman Disiplin', value: state.jenisHukuman },
        ].map((row, idx) => (
          <tr key={idx} className="even:bg-gray-50 dark:even:bg-gray-700">
            <th className="p-2 border font-medium text-gray-700 dark:text-gray-200 w-1/3">{row.label}</th>
            <td className="p-2 border text-gray-700 dark:text-gray-300">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Komponen baru untuk menampilkan tabel angka
const AngkaTable = ({ state, kelompok }) => (
  <div className="overflow-x-auto rounded-lg border">
    <table className="w-full text-sm text-left border-collapse">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-800">
          <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200 w-1/12">No</th>
          <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200">Unsur Unsur</th>
          <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200 w-1/6">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {/* Nilai Pokok */}
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right">1.</td>
          <td className="p-2 border">Nilai Pokok</td>
          <td className="p-2 border text-right">{state.nilaiPokok ?? ''}</td>
        </tr>

        {/* Nilai Tambahan */}
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right">2.</td>
          <td className="p-2 border">Nilai Tambahan</td>
          <td className="p-2 border text-right">{state.nilaiTambahan ?? ''}</td>
        </tr>

        {/* Tambahan Faktor */}
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right">2.1.</td>
          <td className="p-2 border">Faktor Pembobotan Tambahan</td>
          <td className="p-2 border text-right"></td>
        </tr>

        {/* Faktor Tambahan Rinci */}
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right"></td>
          <td className="p-2 border pl-8">Jumlah Pasal</td>
          <td className="p-2 border text-right">{state.faktorTambahanJumlahPasal ?? 0}</td>
        </tr>
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right"></td>
          <td className="p-2 border pl-8">Rekam Jejak</td>
          <td className="p-2 border text-right">{state.faktorTambahanRekamJejak ?? 0}</td>
        </tr>
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right"></td>
          <td className="p-2 border pl-8">Kesengajaan</td>
          <td className="p-2 border text-right">{state.faktorTambahanKesengajaan ?? 0}</td>
        </tr>
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right"></td>
          <td className="p-2 border pl-8">Hambatan Pemeriksaan</td>
          <td className="p-2 border text-right">{state.faktorTambahanHambatan ?? 0}</td>
        </tr>
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right">2.2.</td>
          <td className="p-2 border pl-8">Faktor Meringankan</td>
          <td className="p-2 border text-right">({state.faktorMeringankanNilai ?? 0})</td>
        </tr>

        {/* Nilai Akhir */}
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <td className="p-2 border text-right">3.</td>
          <td className="p-2 border">Nilai Akhir</td>
          <td className="p-2 border text-right">{state.nilaiAkhir ?? ''}</td>
        </tr>

      </tbody>
    </table>
  </div>
);