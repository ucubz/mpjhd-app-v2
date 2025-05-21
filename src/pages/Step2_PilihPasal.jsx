// Step 2 - Pilih pasal
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext'; // <-- tambahkan useResetMPJHD
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import { tentukanKelompok } from '../utils_v2/tentukanKelompok';
import { useEffect } from 'react';

// --- CUSTOM HOOK: cek state step sebelumnya ---
function useRequireStep(requiredFields = [], redirectTo = '/step/1') {
  const { state } = useMPJHD();
  const resetMPJHD = useResetMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    const missing = requiredFields.some((field) => !state[field]);
    if (missing) {
      resetMPJHD();
      navigate(redirectTo, { replace: true });
    }
  }, [state, requiredFields, navigate, redirectTo, resetMPJHD]);
}

// --- END CUSTOM HOOK ---

const daftarPasal = {
  pasal3: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia dan taat sepenuhnya kepada Pancasila, UUD 1945, NKRI, dan Pemerintah' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat pemerintah yang berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kejujuran, kesadaran, dan tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan di dalam maupun di luar kedinasan' },
    { kode: 'Pasal 3 huruf g', deskripsi: 'Menyimpan rahasia jabatan sesuai ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf h', deskripsi: 'Bersedia ditempatkan di seluruh wilayah NKRI' }
  ],
  
  pasal4: [
    { kode: 'Pasal 4 huruf a', deskripsi: 'Menghadiri dan mengucapkan sumpah/janji PNS' },
    { kode: 'Pasal 4 huruf b', deskripsi: 'Menghadiri dan mengucapkan sumpah/janji jabatan' },
    { kode: 'Pasal 4 huruf c', deskripsi: 'Mengutamakan kepentingan negara daripada kepentingan pribadi, seseorang, atau golongan' },
    { kode: 'Pasal 4 huruf d', deskripsi: 'Melaporkan dengan segera kepada atasan apabila mengetahui hal yang membahayakan keamanan atau keuangan negara' },
    { kode: 'Pasal 4 huruf e', deskripsi: 'Melaporkan harta kekayaan kepada pejabat berwenang' },
    { kode: 'Pasal 4 huruf f', deskripsi: 'Masuk kerja dan menaati ketentuan jam kerja' },
    { kode: 'Pasal 4 huruf g', deskripsi: 'Menggunakan dan memelihara barang milik negara dengan sebaik-baiknya' },
    { kode: 'Pasal 4 huruf h', deskripsi: 'Memberikan kesempatan kepada bawahan untuk mengembangkan kompetensi' },
    { kode: 'Pasal 4 huruf i', deskripsi: 'Menolak segala bentuk pemberian yang berkaitan dengan tugas dan fungsi kecuali penghasilan sah' }
  ],
  
  pasal5: [
    { kode: 'Pasal 5 huruf a', deskripsi: 'Menyalahgunakan wewenang' },
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara untuk mendapatkan keuntungan pribadi dan/atau orang lain dengan menggunakan kewenangan orang lain' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Menjadi pegawai atau bekerja untuk negara lain' },
    { kode: 'Pasal 5 huruf d', deskripsi: 'Bekerja di lembaga atau organisasi internasional tanpa izin atau penugasan' },
    { kode: 'Pasal 5 huruf e', deskripsi: 'Bekerja pada perusahaan asing, konsultan asing, atau LSM asing tanpa penugasan' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Memiliki, menjual, membeli, menggadaikan, menyewakan, atau meminjamkan barang milik negara secara tidak sah' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Melakukan pungutan di luar ketentuan' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Melakukan kegiatan yang merugikan negara' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Bertindak sewenang-wenang terhadap bawahan' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Menghalangi berjalannya tugas kedinasan' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Menerima hadiah yang berhubungan dengan jabatan dan/atau pekerjaan' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Meminta sesuatu yang berhubungan dengan jabatan' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Melakukan atau tidak melakukan tindakan yang dapat mengakibatkan kerugian bagi pihak yang dilayani' },
    { kode: 'Pasal 5 huruf n', deskripsi: 'Memberikan dukungan kepada calon peserta pemilu (Presiden/Wakil, DPR, DPD, DPRD, Kepala Daerah) dengan cara:' },
    { kode: 'Pasal 5 huruf n angka 1', deskripsi: 'Ikut kampanye' },
    { kode: 'Pasal 5 huruf n angka 2', deskripsi: 'Menjadi peserta kampanye dengan atribut partai atau atribut PNS' },
    { kode: 'Pasal 5 huruf n angka 3', deskripsi: 'Mengerahkan PNS lain untuk ikut kampanye' },
    { kode: 'Pasal 5 huruf n angka 4', deskripsi: 'Menggunakan fasilitas negara untuk kampanye' },
    { kode: 'Pasal 5 huruf n angka 5', deskripsi: 'Membuat keputusan atau tindakan yang menguntungkan atau merugikan pasangan calon' },
    { kode: 'Pasal 5 huruf n angka 6', deskripsi: 'Mengadakan kegiatan berpihak kepada pasangan calon (pertemuan, ajakan, himbauan, pemberian barang)' },
    { kode: 'Pasal 5 huruf n angka 7', deskripsi: 'Memberikan surat dukungan disertai fotokopi KTP atau Surat Keterangan Tanda Penduduk' }
  ],
  
};

export default function Step2_PilihPasal() {
  // --- Tambahkan ini di awal komponen: cek jenisPilihanUtama wajib ada ---
  useRequireStep(['jenisPilihanUtama'], '/step/1');
  // ------------------------------------------------------

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const handleSelect = (pasal) => {
    const kelompok = tentukanKelompok(pasal);
    dispatch({ type: 'SET', field: 'pasalUtama', value: pasal });
    dispatch({ type: 'SET', field: 'kelompok', value: kelompok });
    navigate('/step/3');
  };

  const pasalList = daftarPasal[state.jenisPilihanUtama] || [];

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 1" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Pilih Pasal yang Dilanggar</h2>
        <RadioGroup onChange={handleSelect}>
          <div className="space-y-3">
            {pasalList.map((item) => (
              <RadioGroup.Option
                key={item.kode}
                value={item.kode}
                className={({ checked }) =>
                  `p-4 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                  }`
                }
              >
                {({ checked }) => (
                  <div className="flex items-start gap-3">
                    {checked && (
                      <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-1" />
                    )}
                    <div>
                      <p className="font-semibold">{item.kode}</p>
                      <p className="text-sm">{item.deskripsi}</p>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        <div className="mt-12">
          <Stepper currentStep={2} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}