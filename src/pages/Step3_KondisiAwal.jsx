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

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State untuk kontrol dialog
  const [dialogMessage, setDialogMessage] = useState(''); // Pesan dialog

  // Pastikan kelompok memiliki nilai fallback jika kosong
  const kelompok = state.kelompok || 'Tidak Diketahui';

  // State untuk validasi pertanyaan yang harus dijawab
  const [isDampakValid, setIsDampakValid] = useState(!['II', 'VI'].includes(kelompok));
  const [isJabatanValid, setIsJabatanValid] = useState(state.pasalUtama !== 'Pasal 4 huruf e');
  const [isKerugianValid, setIsKerugianValid] = useState(kelompok !== 'III');
  const [kerugianSelected, setKerugianSelected] = useState(state.adaKerugian || null); // Untuk menyimpan pilihan

  // Opsi untuk RadioGroup
  const dampakOptions = kelompok === 'II'
    ? ['Unit Kerja', 'Instansi', 'Negara']
    : ['Tidak Berdampak', 'Unit Kerja', 'Instansi/Tersangka'];

  // Validasi apakah user bisa melanjutkan ke langkah berikutnya
  const isComplete = isDampakValid && isJabatanValid && isKerugianValid;

  // Navigasi ke langkah berikutnya
  const nextStep = () => navigate('/step/4');

  // Logika untuk memperbarui validasi
  const handleDampakChange = (val) => {
    dispatch({ type: 'SET', field: 'dampak', value: val });
    setIsDampakValid(true);
  };

  const handleJabatanChange = (val) => {
    dispatch({ type: 'SET', field: 'jabatan', value: val });
    setIsJabatanValid(true);
  };

  const handleKerugianChange = (val) => {
    setKerugianSelected(val); // Simpan pilihan sementara
    setIsKerugianValid(true); // Validasi selesai
  };

  const handleKerugianSubmit = () => {
    dispatch({ type: 'SET', field: 'adaKerugian', value: kerugianSelected });

    if (kelompok === 'III') {
      const newKelompok = kerugianSelected ? 'III Khusus' : 'III Umum';
      dispatch({ type: 'SET', field: 'kelompok', value: newKelompok });
    }

    nextStep(); // Navigasi ke langkah berikutnya
  };

  // Menampilkan dialog hanya untuk kelompok II dan VI saat page dimuat
  useEffect(() => {
    console.log('Kelompok saat ini:', kelompok); // Debugging nilai kelompok
    if (['II', 'VI'].includes(kelompok)) {
      setDialogMessage(`Pelanggaran ini termasuk ke dalam Kelompok ${kelompok}.`);
      setIsDialogOpen(true);
    }
  }, [kelompok]);

  return (
    <PageWrapper>
      {/* Dialog Informasi Kelompok */}
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

        {/* Pertanyaan Dampak */}
        {['II', 'VI'].includes(kelompok) && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Dampak pelanggaran:</p>
            <RadioGroup value={state.dampak} onChange={handleDampakChange}>
              <div className="space-y-2">
                {dampakOptions.map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${
                        checked
                          ? 'bg-blue-100 border-blue-500 text-black dark:text-gray-900'
                          : 'border-gray-300 dark:bg-gray-700 dark:text-gray-300'
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

        <div className="mt-12">
          <Stepper currentStep={3} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}