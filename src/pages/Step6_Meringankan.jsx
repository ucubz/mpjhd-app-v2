import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import Button from '../components/Button';
import { getAvailableMeringankanOptions } from '../utils_v2/hitungFaktorMeringankan';

export default function Step6_Meringankan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const kelompok = String(state.kelompok || '').toUpperCase();
  const tipe = state.tipeKelompokIII || '';
  const kelompokAktif = kelompok === 'III' ? `III_${tipe.toUpperCase()}` : kelompok;

  const faktor = state.faktorMeringankan || {};
  const tersedia = getAvailableMeringankanOptions(kelompokAktif);

  const handleChange = (field) => {
    dispatch({
      type: 'SET_FAKTOR_MERINGANKAN',
      field,
      value: !faktor[field],
    });
  };

  const handleNext = () => {
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

        <div className="space-y-4">
          {tersedia.includes('kooperatif') && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={faktor.kooperatif || false}
                onChange={() => handleChange('kooperatif')}
                className="h-5 w-5"
              />
              <span>Kooperatif saat diperiksa</span>
            </label>
          )}

          {tersedia.includes('inisiator') && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={faktor.inisiator || false}
                onChange={() => handleChange('inisiator')}
                className="h-5 w-5"
              />
              <span>Pelapor adalah pelaku utama (inisiator)</span>
            </label>
          )}
        </div>

        <Button onClick={handleNext} className="mt-6 w-full">
          Lanjut
        </Button>

        <div className="mt-12">
          <Stepper currentStep={6} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}
