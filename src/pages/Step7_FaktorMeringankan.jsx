import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { RadioGroup } from '@headlessui/react';

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function Step7_FaktorMeringankan() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();

  const pembobotan = state.faktorPembobotan || { meringankan: '' };

  const options = [
    { value: 'tidakAda', label: 'Tidak ada faktor meringankan' },
    { value: 'kooperatif', label: 'Berperilaku baik / kooperatif selama pemeriksaan' },
    { value: 'inisiator', label: 'Sebagai inisiator pengungkapan pelanggaran' },
  ];

  const handleChange = (value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', key: 'meringankan', value });
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

          <RadioGroup value={pembobotan.meringankan} onChange={handleChange}>
            <div className="flex flex-col gap-2 mt-2">
              {options.map((item) => (
                <RadioGroup.Option
                  key={item.value}
                  value={item.value}
                  className={({ checked }) =>
                    `cursor-pointer p-3 rounded-md border text-sm ${
                      checked
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                    }`
                  }
                >
                  {item.label}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>

          {/* Tombol Back */}
          <div className="flex justify-start gap-4 mt-6">
            <BackButton />
          </div>

        </div>
      </Card>

      <Stepper currentStep={7} />
    </PageWrapper>
  );
}
