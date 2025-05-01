import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';

export default function Step3_KondisiAwal() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const kelompok = state.kelompok || 'Tidak Diketahui';

  const dampakOptions = ['Unit Kerja', 'Instansi', 'Negara'];
  const reputasiOptions = ['Tidak Berdampak', 'Unit Kerja', 'Instansi/Tersangka'];
  const jabatanOptions = [
    'Pejabat Administrator',
    'Pejabat Fungsional',
    'Pejabat Pimpinan Tinggi',
    'Pejabat lainnya',
  ];

  const handleOptionChange = (val, field) => {
    dispatch({ type: 'SET', field, value: val });
    setIsOptionSelected(true);
  };

  const handleNextStep = () => {
    if (kelompok === 'III') {
      const newKelompok = state.adaKerugian ? 'III Khusus' : 'III Umum';
      dispatch({ type: 'SET', field: 'kelompok', value: newKelompok });
    }
    navigate('/step/4');
  };

  useEffect(() => {
    console.log('Kelompok saat ini:', kelompok);

    if (state.pasalUtama === 'Pasal 4 huruf f') {
      navigate('/step/6'); // Langsung ke Step6 untuk pasal 4 huruf f
      return;
    }

    if (kelompok === 'I') {
      navigate('/step/6'); // Langsung ke Step6 untuk kelompok I
      return;
    }

    if (kelompok === 'IV') {
      navigate('/step/4'); // Langsung ke Step4 untuk kelompok IV
      return;
    }

    if (['II', 'V', 'VI'].includes(kelompok)) {
      setDialogMessage(`Pelanggaran ini termasuk ke dalam Kelompok ${kelompok}.`);
      setIsDialogOpen(true);
    }
  }, [kelompok, state.pasalUtama, navigate]);

  return (
    <PageWrapper>
      <Transition appear show={isDialogOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={() => setIsDialogOpen(false)}>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 dark:text-gray-100">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Informasi Kelompok
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">{dialogMessage}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Mengerti
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 2" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Kondisi Awal</h2>

        {/* Pertanyaan berdasarkan kelompok */}
        {kelompok === 'II' && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Dampak pelanggaran:</p>
            <RadioGroup value={state.dampak} onChange={(val) => handleOptionChange(val, 'dampak')}>
              <div className="space-y-2">
                {['Unit Kerja', 'Instansi', 'Negara'].map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${
                        checked ? 'bg-blue-100 border-blue-500 text-black' : 'border-gray-300'
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{val}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <button
              onClick={handleNextStep}
              disabled={!isOptionSelected}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                isOptionSelected
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut
            </button>
          </div>
        )}

        {kelompok === 'III' && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Apakah terdapat kerugian negara/pihak lain?</p>
            <RadioGroup value={state.adaKerugian} onChange={(val) => handleOptionChange(val, 'adaKerugian')}>
              <div className="space-y-2">
                {['Ya', 'Tidak'].map((label, idx) => (
                  <RadioGroup.Option
                    key={label}
                    value={idx === 0}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${
                        checked ? 'bg-blue-100 border-blue-500 text-black' : 'border-gray-300'
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{label}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {kelompok === 'V' && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Jabatan Pelaku:</p>
            <RadioGroup value={state.jabatan} onChange={(val) => handleOptionChange(val, 'jabatan')}>
              <div className="space-y-2">
                {jabatanOptions.map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${
                        checked ? 'bg-blue-100 border-blue-500 text-black' : 'border-gray-300'
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{val}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {kelompok === 'VI' && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Dampak terhadap reputasi atau pelaksanaan tugas:</p>
            <RadioGroup value={state.reputasi} onChange={(val) => handleOptionChange(val, 'reputasi')}>
              <div className="space-y-2">
                {reputasiOptions.map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${
                        checked ? 'bg-blue-100 border-blue-500 text-black' : 'border-gray-300'
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{val}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        <button
          onClick={handleNextStep}
          disabled={!isOptionSelected}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            isOptionSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Lanjut
        </button>

        <div className="mt-12">
          <Stepper currentStep={3} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}