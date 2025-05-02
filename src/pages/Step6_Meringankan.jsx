import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import { hitungNilaiAkhir } from '../utils_v2/hitungNilaiAkhir';

export default function Step6_Meringankan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const meringankan = state.faktorMeringankan;

  const updateCheckbox = (field) => {
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

    const hasil = hitungNilaiAkhir({ ...state, pengurangMeringankan: pengurang });
    dispatch({ type: 'SET_NILAI_AKHIR', nilaiAkhir: hasil.nilaiAkhir });

    navigate('/step/7');
  };

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 5" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Faktor Meringankan</h2>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={meringankan.kooperatif}
              onChange={() => updateCheckbox('kooperatif')}
              className="h-4 w-4"
            />
            <span>Berperilaku baik dan/atau kooperatif selama proses pemeriksaan (nilai 5)</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={meringankan.inisiator}
              onChange={() => updateCheckbox('inisiator')}
              className="h-4 w-4"
            />
            <span>Inisiator pengungkapan pelanggaran signifikan (nilai 10)</span>
          </label>
        </div>

        <button
          onClick={handleNext}
          className="mt-4 w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Lanjut
        </button>

        <div className="mt-12">
          <Stepper currentStep={6} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}