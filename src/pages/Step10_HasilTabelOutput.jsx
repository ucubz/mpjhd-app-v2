// src/pages/Step10_HasilAkhir.jsx

import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { formatClipboard } from '../utils/mpjhdHelper';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import HasilTabelAngka from '../components/HasilTabelAngka';

// Komponen kecil harus di atas sebelum export default!
const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
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

// Komponen utama Step10
const Step10_HasilAkhir = () => {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const handleCopyRingkasan = async () => {
    try {
      await navigator.clipboard.writeText(formatClipboard(state));
      alert('✅ Ringkasan berhasil disalin ke clipboard!');
    } catch (err) {
      alert('❌ Gagal menyalin ringkasan.');
    }
  };

  const handleCopyTabelAngka = async () => {
    const el = document.getElementById('tabel-angka');
    if (el) {
      try {
        await navigator.clipboard.writeText(el.innerHTML);
        alert('✅ Tabel angka berhasil disalin ke clipboard!');
      } catch (err) {
        alert('❌ Gagal menyalin tabel angka.');
      }
    } else {
      alert('❌ Tabel angka tidak ditemukan.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengulang dari awal? Semua data akan dihapus.')) {
      dispatch({ type: 'RESET' });
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Akhir MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-8">

          {/* Section Ringkasan */}
          <Section title="Ringkasan Pelanggaran">
            <SummaryTable state={state} />
          </Section>

          {/* Section Tabel Angka */}
          <Section title="Rincian Perhitungan MPJHD">
            <HasilTabelAngka kelompok={state.kelompok} hasilState={state} />
            <div className="flex justify-end mt-4">
              <Button onClick={handleCopyTabelAngka} className="bg-blue-600 hover:bg-blue-700">
                Salin Tabel Angka
              </Button>
            </div>
          </Section>

          {/* Tombol Navigasi */}
          <div className="flex flex-col md:flex-row gap-4">
            <BackButton className="flex-1" />
            <Button onClick={handleCopyRingkasan} className="flex-1 bg-green-600 hover:bg-green-700">
              Salin Ringkasan
            </Button>
          </div>

          <Button
            onClick={handleReset}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Ulang dari Awal
          </Button>

        </div>
      </Card>

      <Stepper currentStep={10} />
    </PageWrapper>
  );
};

export default Step10_HasilAkhir;
