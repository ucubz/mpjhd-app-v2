import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';

export default function Step6_FaktorMeringankan() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();
  const [error, setError] = useState('');

  const handleToggle = (field) => {
    dispatch({
      type: 'SET_FAKTOR_MERINGANKAN',
      field,
      value: !state.faktorMeringankan[field],
    });
  };

  const handleNext = () => {
    // Tidak wajib dipilih, langsung ke step 7
    navigate('/step/7');
  };

  return (
    <PageWrapper>
      <Stepper totalSteps={7} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-center">Faktor Meringankan</h2>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={state.faktorMeringankan.kooperatif}
              onChange={() => handleToggle('kooperatif')}
            />
            Berperilaku baik / Kooperatif (nilai 5)
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={state.faktorMeringankan.inisiator}
              onChange={() => handleToggle('inisiator')}
            />
            Inisiator pengungkapan pelanggaran besar (nilai 10)
          </label>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleNext}>Lanjut</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
