// Step 7 - Hasil akhir
import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { generateHTMLTable } from '../utils/generateHTMLTable';

export default function Step7_HasilAkhir() {
  const { state } = useMPJHD();
  const navigate = useNavigate();
  const kelompok = state.kelompok;

  const handleCopy = async () => {
    const html = generateHTMLTable(kelompok, state);
    await navigator.clipboard.write([
      new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) })
    ]);
    alert('Hasil telah disalin ke clipboard!');
  };

  const formatNilai = (val) => (val ?? 0).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          if (confirm('Yakin ingin mereset dan kembali ke awal?')) {
            navigate('/step/1');
          }
        }}
        className="text-red-600 font-semibold mb-4"
      >
        Reset
      </button>

      <h2 className="text-xl font-bold mb-6">Hasil Rekapitulasi</h2>

      {/* Ringkasan visual */}
      <table className="w-full border border-gray-300 dark:border-gray-600 text-sm">
        <tbody>
          <tr><td className="p-2 font-semibold">Pasal yang dilanggar</td><td className="p-2">{state.pasalUtama}</td></tr>
          <tr><td className="p-2 font-semibold">Kelompok</td><td className="p-2">{state.kelompok}</td></tr>
          <tr><td className="p-2 font-semibold">Nilai Pokok</td><td className="p-2">{state.nilaiPokok}</td></tr>
          <tr><td className="p-2 font-semibold">Nilai Tambahan</td><td className="p-2">{state.nilaiTambahan}</td></tr>
          <tr><td className="p-2 font-semibold">Faktor Meringankan</td><td className="p-2">{state.pengurangMeringankan}</td></tr>
          <tr>
            <td className="p-2 font-semibold">Nilai Akhir</td>
            <td className="p-2 font-bold">{formatNilai(state.nilaiAkhir)}</td>
          </tr>
          <tr><td className="p-2 font-semibold">Grade</td><td className="p-2">{state.grade}</td></tr>
          <tr><td className="p-2 font-semibold">Jenis Hukuman Disiplin</td><td className="p-2">{state.jenisHukuman}</td></tr>
        </tbody>
      </table>

      <div className="mt-6">
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Salin Tabel ke Clipboard
        </button>
      </div>

      <div className="mt-12">
        <Stepper currentStep={7} totalSteps={7} />
        <button
          onClick={() => navigate('/step/6')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}