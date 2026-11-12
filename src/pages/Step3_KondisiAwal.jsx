import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import useRequireStep from '../hooks/useRequireStep';
import StepLayout from '../components/StepLayout';
import OptionList from '../components/OptionList';
import { pasalBelumDiatur } from '../utils_v2/tentukanNilaiPokok';

const dampakOptions = ['Unit Kerja', 'Instansi', 'Negara'].map((v) => ({ value: v, label: v }));
const reputasiOptions = [
  { value: 'Tidak Berdampak', label: 'Tidak berdampak' },
  { value: 'Unit Kerja', label: 'Berdampak pada unit kerja' },
  { value: 'Instansi/Tersangka', label: 'Berdampak pada instansi / menjadi tersangka' },
];
const jabatanOptions = [
  'Pejabat Administrator',
  'Pejabat Fungsional',
  'Pejabat Pimpinan Tinggi',
  'Pejabat lainnya',
].map((v) => ({ value: v, label: v }));
const kerugianOptions = [
  { value: true, label: 'Ya' },
  { value: false, label: 'Tidak' },
];

export default function Step3_KondisiAwal() {
  useRequireStep(['pasalUtama', 'kelompok'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const kelompok = state.kelompok || '';

  const set = (field) => (value) => dispatch({ type: 'SET', field, value });

  // Kelompok -> pertanyaan yang ditampilkan
  const pertanyaan = {
    II: { label: 'Dampak pelanggaran', options: dampakOptions, value: state.dampak, field: 'dampak' },
    III: { label: 'Apakah terdapat kerugian negara/pihak lain?', options: kerugianOptions, value: state.adaKerugian, field: 'adaKerugian' },
    V: { label: 'Jabatan pelaku', options: jabatanOptions, value: state.jabatan, field: 'jabatan' },
    VI: { label: 'Dampak terhadap reputasi atau pelaksanaan tugas', options: reputasiOptions, value: state.reputasi, field: 'reputasi' },
  }[kelompok];

  const sudahDipilih = pertanyaan && pertanyaan.value !== null && pertanyaan.value !== undefined && pertanyaan.value !== '';

  const handleNextStep = () => {
    if (kelompok === 'III') {
      if (state.adaKerugian === true) {
        dispatch({ type: 'SET', field: 'tipeKelompokIII', value: '' }); // dipilih di Step 4
        navigate('/step/4');
      } else {
        dispatch({ type: 'SET', field: 'tipeKelompokIII', value: 'umum' });
        navigate('/step/5');
      }
      return;
    }
    navigate('/step/5'); // II, V, VI
  };

  useEffect(() => {
    // replace: supaya tombol Kembali dari Step 4/6 tidak memantul kembali ke halaman ini
    if (state.pasalUtama === 'Pasal 4 huruf f' || kelompok === 'I') {
      navigate('/step/6', { replace: true });
      return;
    }
    if (kelompok === 'IV') {
      navigate('/step/4', { replace: true });
      return;
    }
    if (['II', 'V', 'VI'].includes(kelompok)) {
      setDialogMessage(`Pelanggaran ini termasuk ke dalam Kelompok ${kelompok}.`);
      setIsDialogOpen(true);
    }
  }, [kelompok, state.pasalUtama, navigate]);

  return (
    <StepLayout
      step={3}
      title="Kondisi Awal"
      subtitle={`Kelompok ${kelompok}`}
      onNext={handleNextStep}
      nextDisabled={!sudahDipilih}
      outside={
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
      }
    >
      {pasalBelumDiatur(state.pasalUtama) && (
        <div className="mb-4 rounded-xl border border-amber-400 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200">
          {state.pasalUtama} tidak diatur dalam tabel PMK 123/2023. Dimasukkan ke Kelompok V dengan nilai pokok 30
          (angka terendah Kelompok V); mohon verifikasi hasil akhir secara manual.
        </div>
      )}

      {pertanyaan && (
        <>
          <p className="mb-2 font-semibold">{pertanyaan.label}</p>
          <OptionList
            value={pertanyaan.value}
            onChange={set(pertanyaan.field)}
            options={pertanyaan.options}
            label={pertanyaan.label}
          />
        </>
      )}
    </StepLayout>
  );
}
