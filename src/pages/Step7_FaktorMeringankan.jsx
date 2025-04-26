import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import InputRadio from '../components/InputRadio'; // 🔥 pakai komponen InputRadio
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';

export default function Step7_FaktorMeringankan() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();

  const pembobotan = state.faktorPembobotan || {
    meringankan: '',
  };

  const handleChange = (key, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', key, value });
  };

  const handleNext = () => {
    navigate('/step/8');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Meringankan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          <p className="text-gray-700 dark:text-gray-200 text-center">
            Pilih faktor meringankan yang sesuai:
          </p>

          <div className="flex flex-col gap-4">
            <InputRadio
              label="Faktor Meringankan:"
              name="faktorMeringankan"
              value={pembobotan.meringankan}
              onChange={(val) => handleChange('meringankan', val)}
              options={[
                { value: 'tidakAda', label: 'Tidak ada faktor meringankan' },
                { value: 'kooperatif', label: 'Berperilaku baik / kooperatif selama pemeriksaan' },
                { value: 'inisiator', label: 'Sebagai inisiator pengungkapan pelanggaran' },
              ]}
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>

        </div>
      </Card>

      <Stepper currentStep={7} />
    </PageWrapper>
  );
}
