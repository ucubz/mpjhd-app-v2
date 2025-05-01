import { useEffect, useState } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
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

  const kelompok = state.kelompok || 'Tidak Diketahui';
  const isKelompokIII = ['III', 'III Umum', 'III Khusus'].includes(kelompok);
  const isKelompokV = kelompok === 'V';
  const isKelompokVI = kelompok === 'VI';

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

    if (kelompok === 'III' && field === 'adaKerugian') {
      const newKelompok = val ? 'III Khusus' : 'III Umum';
      dispatch({ type: 'SET', field: 'kelompok', value: newKelompok });
    }

    if (kelompok === 'VI' && field === 'reputasi') {
      let nilai = 0;
      if (val === 'Unit Kerja') nilai = 15;
      if (val === 'Instansi/Tersangka') nilai = 30;
      dispatch({ type: 'SET_FAKTOR_UTAMA', field: 'nilai', value: nilai });
    }
  };

  const handleNextStep = () => {
    navigate('/step/4');
  };

  useEffect(() => {
    if (state.pasalUtama === 'Pasal 4 huruf f' || kelompok === 'I') {
      navigate('/step/6');
      return;
    }
    if (kelompok === 'IV') {
      navigate('/step/4');
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
                  <Dialog.Title className="text-lg font-medium">Informasi Kelompok</Dialog.Title>
                  <div className="mt-2 text-sm">{dialogMessage}</div>
                  <div className="mt-4 text-right">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium px-4 py-2 rounded-md"
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

        {/* Kelompok II */}
        {kelompok === 'II' && (
          <>
            <p className="font-semibold mb-2">Dampak pelanggaran:</p>
            <RadioGroup value={state.dampak} onChange={(val) => handleOptionChange(val, 'dampak')}>
              <div className="space-y-2">
                {dampakOptions.map((val) => (
                  <RadioGroup.Option key={val} value={val} className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
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
              disabled={!state.dampak}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                state.dampak ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut
            </button>
          </>
        )}

        {/* Kelompok III */}
        {isKelompokIII && (
          <>
            <p className="font-semibold mb-2">Apakah terdapat kerugian negara/pihak lain?</p>
            <RadioGroup value={state.adaKerugian} onChange={(val) => handleOptionChange(val, 'adaKerugian')}>
              <div className="space-y-2">
                {['Ya', 'Tidak'].map((label, idx) => (
                  <RadioGroup.Option key={label} value={idx === 0} className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
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
            <button
              onClick={handleNextStep}
              disabled={state.adaKerugian === null}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                state.adaKerugian !== null ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut
            </button>
          </>
        )}

        {/* Kelompok V */}
        {isKelompokV && (
          <>
            <p className="font-semibold mb-2">Jabatan Pelaku:</p>
            <RadioGroup value={state.jabatan} onChange={(val) => handleOptionChange(val, 'jabatan')}>
              <div className="space-y-2">
                {jabatanOptions.map((val) => (
                  <RadioGroup.Option key={val} value={val} className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
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
              disabled={!state.jabatan}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                state.jabatan ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut
            </button>
          </>
        )}

        {/* Kelompok VI */}
        {isKelompokVI && (
          <>
            <p className="font-semibold mb-2">Dampak terhadap reputasi atau pelaksanaan tugas:</p>
            <RadioGroup value={state.reputasi} onChange={(val) => handleOptionChange(val, 'reputasi')}>
              <div className="space-y-2">
                {reputasiOptions.map((val) => (
                  <RadioGroup.Option key={val} value={val} className={({ checked }) =>
                    `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                  }>
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
              disabled={!state.reputasi}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                state.reputasi ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Lanjut
            </button>
          </>
        )}

        <div className="mt-12">
          <Stepper currentStep={3} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}