// src/pages/Step10_HasilTabelOutput.jsx

import { useNavigate } from 'react-router-dom'; import { useMPJHD } from '../context/MPJHDContext'; import PageWrapper from '../components/PageWrapper'; import Card from '../components/Card'; import Button from '../components/Button'; import BackButton from '../components/BackButton'; import Stepper from '../components/Stepper'; import HasilTabelOutput from '../components/HasilTabelOutput'; import { generateHTMLTable } from '../utils/generateHTMLTable';

export default function Step10_HasilTabelOutput() { const { state } = useMPJHD(); const navigate = useNavigate();

const handleReset = () => { if (window.confirm('Yakin ingin mengulang perhitungan MPJHD? Semua data akan dihapus.')) { navigate('/'); window.location.reload(); } };

const handleCopyTable = async () => { const html = generateHTMLTable(state.kelompok, state);

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

return ( <PageWrapper> <h1 className="text-2xl font-bold text-center mb-8"> Hasil Akhir MPJHD </h1>

<Card>
    <div className="flex flex-col gap-8">

      {/* Tabel Ringkasan */}
      <Section title="Ringkasan Pelanggaran">
        <SummaryTable state={state} />
      </Section>

      {/* Tabel Perhitungan Angka */}
      <Section title="Rincian Perhitungan MPJHD">
        <HasilTabelOutput kelompok={state.kelompok} hasilState={state} />
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

); }

const Section = ({ title, children }) => (

  <section className="space-y-4">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
    {children}
  </section>
);const SummaryTable = ({ state }) => { return ( <div className="overflow-x-auto rounded-lg border"> <table className="w-full text-sm text-left border-collapse"> <tbody>

{/* Bagian: Identitas Pelanggaran */}
      <tr className="bg-gray-200 dark:bg-gray-800">
        <th colSpan={2} className="p-2 border font-bold text-center text-gray-800 dark:text-gray-100">
          Identitas Pelanggaran
        </th>
      </tr>
      {[ 
        { label: 'Kategori Pelanggaran', value: state.kategori },
        { label: 'Pasal Utama', value: state.pasalUtama },
        { label: 'Kelompok', value: state.kelompok },
        { label: 'Dampak', value: state.dampak },
        { label: 'Riwayat Hukdis', value: state.riwayatHukdis },
        { label: 'Motif Keuntungan', value: state.motifKeuntungan },
        { label: 'Peran Pelaku', value: state.peranPelaku },
        { label: 'Ada Kerugian', value: state.adaKerugian ? 'Ya' : 'Tidak' },
      ].map((row, idx) => (
        <tr key={`identitas-${idx}`} className="even:bg-gray-50 dark:even:bg-gray-700">
          <th className="p-2 border font-medium text-gray-700 dark:text-gray-200 w-1/3">{row.label}</th>
          <td className="p-2 border text-gray-700 dark:text-gray-300">{row.value}</td>
        </tr>
      ))}

      {state.adaKerugian && (
        <tr className="even:bg-gray-50 dark:even:bg-gray-700">
          <th className="p-2 border font-medium text-gray-700 dark:text-gray-200">Jumlah Kerugian</th>
          <td className="p-2 border text-gray-700 dark:text-gray-300">
            Rp{state.jumlahKerugian.toLocaleString()}
          </td>
        </tr>
      )}

      {/* Bagian: Faktor Pembobotan */}
      <tr className="bg-gray-200 dark:bg-gray-800">
        <th colSpan={2} className="p-2 border font-bold text-center text-gray-800 dark:text-gray-100">
          Faktor Pembobotan
        </th>
      </tr>
      {[ 
        { label: 'Banyak Pasal', value: state.faktorPembobotan.banyakPasal },
        { label: 'Riwayat Hukdis Sebelumnya', value: state.faktorPembobotan.hukdis },
        { label: 'Kesengajaan', value: state.faktorPembobotan.kesengajaan },
        { label: 'Hambatan', value: state.faktorPembobotan.hambatan },
        { label: 'Faktor Meringankan', value: state.faktorPembobotan.meringankan },
      ].map((row, idx) => (
        <tr key={`pembobotan-${idx}`} className="even:bg-gray-50 dark:even:bg-gray-700">
          <th className="p-2 border font-medium text-gray-700 dark:text-gray-200">{row.label}</th>
          <td className="p-2 border text-gray-700 dark:text-gray-300">{row.value}</td>
        </tr>
      ))}

      {/* Bagian: Faktor Meringankan Tambahan */}
      <tr className="bg-gray-200 dark:bg-gray-800">
        <th colSpan={2} className="p-2 border font-bold text-center text-gray-800 dark:text-gray-100">
          Faktor Meringankan Tambahan
        </th>
      </tr>
      {[ 
        { label: 'Kooperatif', value: state.faktorMeringankan.kooperatif ? 'Ya' : 'Tidak' },
        { label: 'Mengakui Kesalahan', value: state.faktorMeringankan.mengakui ? 'Ya' : 'Tidak' },
        { label: 'Memperbaiki Kerugian', value: state.faktorMeringankan.memperbaiki ? 'Ya' : 'Tidak' },
      ].map((row, idx) => (
        <tr key={`meringankan-${idx}`} className="even:bg-gray-50 dark:even:bg-gray-700">
          <th className="p-2 border font-medium text-gray-700 dark:text-gray-200">{row.label}</th>
          <td className="p-2 border text-gray-700 dark:text-gray-300">{row.value}</td>
        </tr>
      ))}

      {/* Bagian: Hasil Akhir */}
      <tr className="bg-gray-200 dark:bg-gray-800">
        <th colSpan={2} className="p-2 border font-bold text-center text-gray-800 dark:text-gray-100">
          Hasil Akhir Perhitungan
        </th>
      </tr>
      {[ 
        { label: 'Nilai Pokok', value: state.nilaiPokok },
        { label: 'Nilai Akhir', value: state.nilaiAkhir },
        { label: 'Grade Hukuman', value: state.grade },
        { label: 'Jenis Hukuman Disiplin', value: state.jenisHukuman },
      ].map((row, idx) => (
        <tr key={`hasilakhir-${idx}`} className="even:bg-gray-50 dark:even:bg-gray-700">
          <th className="p-2 border font-medium text-gray-700 dark:text-gray-200">{row.label}</th>
          <td className="p-2 border text-gray-700 dark:text-gray-300">{row.value}</td>
        </tr>
      ))}

    </tbody>
  </table>
</div>

); };

