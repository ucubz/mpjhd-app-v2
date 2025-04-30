// Step 2 - Pilih pasal
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD } from '../context/MPJHDContext';
import Stepper from '../components/Stepper';
import { tentukanKelompok } from '../utils_v2/tentukanKelompok';

const daftarPasal = {
  pasal3: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia kepada Pancasila' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan pejabat berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas dengan penuh tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan' },
  ],
  pasal4: [
    { kode: 'Pasal 4 huruf a', deskripsi: 'Mengutamakan kepentingan negara' },
    { kode: 'Pasal 4 huruf b', deskripsi: 'Menghindari konflik kepentingan' },
    { kode: 'Pasal 4 huruf c', deskripsi: 'Memberikan pelayanan kepada masyarakat' },
    { kode: 'Pasal 4 huruf d', deskripsi: 'Menjadi perekat persatuan' },
    { kode: 'Pasal 4 huruf e', deskripsi: 'Melaporkan harta kekayaan' },
    { kode: 'Pasal 4 huruf f', deskripsi: 'Masuk kerja dan menaati jam kerja' },
    { kode: 'Pasal 4 huruf g', deskripsi: 'Menaati perintah atasan' },
    { kode: 'Pasal 4 huruf h', deskripsi: 'Menjaga netralitas' },
    { kode: 'Pasal 4 huruf i', deskripsi: 'Memelihara barang milik negara' },
    { kode: 'Pasal 4 huruf j', deskripsi: 'Melaksanakan tugas kedinasan' },
    { kode: 'Pasal 4 huruf k', deskripsi: 'Menaati peraturan kedinasan' },
  ],
  pasal5: [
    { kode: 'Pasal 5 huruf a', deskripsi: 'Menyalahgunakan wewenang' },
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara untuk keuntungan pribadi' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Bekerja untuk negara lain' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Menguasai barang milik negara secara tidak sah' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Melakukan pungutan liar' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Kegiatan yang merugikan negara' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Tindak sewenang-wenang pada bawahan' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Menghalangi tugas kedinasan' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Menerima hadiah yang berhubungan dengan jabatan' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Meminta sesuatu yang berhubungan dengan jabatan' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Tindakan merugikan pihak dilayani' },
    { kode: 'Pasal 5 huruf n angka 1', deskripsi: 'Memberikan dukungan kepada calon presiden/wakil presiden' },
    { kode: 'Pasal 5 huruf n angka 2', deskripsi: 'Mengikuti kampanye' },
    { kode: 'Pasal 5 huruf n angka 3', deskripsi: 'Peserta kampanye dengan atribut partai/PNS' },
    { kode: 'Pasal 5 huruf n angka 4', deskripsi: 'Mengajak PNS lain ikut kampanye' },
    { kode: 'Pasal 5 huruf n angka 5', deskripsi: 'Menggunakan fasilitas negara untuk kampanye' },
    { kode: 'Pasal 5 huruf n angka 6', deskripsi: 'Membuat keputusan/tindakan yang merugikan calon lain' },
    { kode: 'Pasal 5 huruf n angka 7', deskripsi: 'Memberikan surat dukungan dengan fotokopi KTP' },
  ],
};

export default function Step2_PilihPasal() {
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
    <div className="max-w-xl mx-auto py-10 px-4">
      <button
        onClick={() => {
          if (confirm('Yakin ingin mereset dan kembali ke awal?')) {
            dispatch({ type: 'RESET' });
            navigate('/step/1');
          }
        }}
        className="text-red-600 font-semibold mb-4"
      >
        Reset
      </button>

      <h2 className="text-xl font-bold mb-6">Pilih Pasal yang Dilanggar</h2>

      <RadioGroup onChange={handleSelect}>
        <div className="space-y-3">
          {pasalList.map((item) => (
            <RadioGroup.Option
              key={item.kode}
              value={item.kode}
              className={({ checked }) =>
                `p-4 rounded-xl border cursor-pointer transition-all ${
                  checked
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-300 dark:bg-gray-800'
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
                    <p className="text-sm text-gray-600">{item.deskripsi}</p>
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-12">
        <Stepper currentStep={2} totalSteps={7} />
        <button
          onClick={() => navigate('/step/1')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}