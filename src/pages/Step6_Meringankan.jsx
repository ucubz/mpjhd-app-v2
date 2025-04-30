// Step 6 - Faktor meringankan
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';

export default function Step6_Meringankan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const meringankan = state.faktorMeringankan;

  const updateMeringankan = (field) => {
    dispatch({
      type: 'SET_FAKTOR_MERINGANKAN',
      field,
      value: !meringankan[field],
    });
  };

  const hitungPengurang = () => {
    let total = 0;
    if (meringankan.kooperatif) total += 5;
    if (meringankan.inisiator) total += 10;
    return total;
  };

  const handleNext = () => {
    const pengurang = hitungPengurang();
    dispatch({ type: 'SET_PENGURANG_MERINGANKAN', pengurang });

    const nilaiAkhir = hitungNilaiAkhir(
      state.nilaiPokok || 0,
      state.faktorUtama?.nilai || 0,
      state.nilaiTambahan || 0,
      pengurang
    );
    dispatch({ type: 'SET_NILAI_AKHIR', nilaiAkhir });

    navigate('/step/7');
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          if (confirm('Yakin ingin mereset dan kembali ke awal?')) {
            dispatch({ type: 'RESET' });
            navigate('/step/1');
          }
        }}
        className="text-red-600 font-semibold mb-4"
      >
        Reset
      </button>

      <h2 className="text-xl font-bold mb-6">Faktor Meringankan</h2>

      <div className="space-y-4 mb-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={meringankan.kooperatif}
            onChange={() => updateMeringankan('kooperatif')}
            className="h-4 w-4"
          />
          <span>Berperilaku baik dan/atau kooperatif selama proses pemeriksaan (nilai 5)</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={meringankan.inisiator}
            onChange={() => updateMeringankan('inisiator')}
            className="h-4 w-4"
          />
          <span>Inisiator pengungkapan pelanggaran signifikan (nilai 10)</span>
        </label>
      </div>

      <button
        onClick={handleNext}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Lanjut
      </button>

      <div className="mt-12">
        <Stepper currentStep={6} totalSteps={7} />
        <button
          onClick={() => navigate('/step/5')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}