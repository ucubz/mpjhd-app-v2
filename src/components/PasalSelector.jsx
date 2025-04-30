import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

const pasalMap = {
  pasal3: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia dan taat sepenuhnya kepada Pancasila...' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kejujuran, kesadaran, dan tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan kepada setiap orang, baik di dalam maupun di luar kedinasan' }
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
    { kode: 'Pasal 4 huruf k', deskripsi: 'Menaati peraturan kedinasan' }
  ],
  pasal5: [
    { kode: 'Pasal 5 huruf a', deskripsi: 'Menyalahgunakan wewenang' },
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara untuk keuntungan pribadi' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Menjadi pegawai atau bekerja untuk negara lain' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Memiliki, menjual, membeli, menggadaikan... milik negara secara tidak sah' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Melakukan pungutan di luar ketentuan' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Melakukan kegiatan yang merugikan negara' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Bertindak sewenang-wenang terhadap bawahan' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Menghalangi berjalannya tugas kedinasan' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Menerima hadiah yang berhubungan dengan jabatan dan/atau pekerjaan' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Meminta sesuatu yang berhubungan dengan jabatan' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Melakukan tindakan atau tidak melakukan tindakan yang dapat mengakibatkan kerugian bagi yang dilayani' },
    { kode: 'Pasal 5 huruf n angka 1', deskripsi: 'Memberikan dukungan kepada calon Presiden/Wakil Presiden...' },
    { kode: 'Pasal 5 huruf n angka 2', deskripsi: 'Mengikuti kampanye' },
    { kode: 'Pasal 5 huruf n angka 3', deskripsi: 'Menjadi peserta kampanye dengan atribut partai atau atribut PNS' },
    { kode: 'Pasal 5 huruf n angka 4', deskripsi: 'Mengajak PNS lain ikut kampanye' },
    { kode: 'Pasal 5 huruf n angka 5', deskripsi: 'Menggunakan fasilitas negara untuk kampanye' },
    { kode: 'Pasal 5 huruf n angka 6', deskripsi: 'Membuat keputusan/tindakan menguntungkan atau merugikan calon tertentu' },
    { kode: 'Pasal 5 huruf n angka 7', deskripsi: 'Memberikan surat dukungan disertai fotokopi KTP/Suket' }
  ],
  
};

export default function PasalSelector({ jenisPilihanUtama, onSelect }) {
  const pasalList = pasalMap[jenisPilihanUtama] || [];

  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
        Pilih Pasal yang Dilanggar
      </h2>
      <RadioGroup onChange={onSelect}>
        <div className="space-y-2">
          {pasalList.map((item) => (
            <RadioGroup.Option
              key={item.kode}
              value={item.kode}
              className={({ checked }) =>
                `cursor-pointer flex items-start gap-3 p-3 rounded-xl border transition-all ${
                  checked
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                    : 'bg-white border-gray-300 dark:bg-gray-800'
                }`
              }
            >
              {({ checked }) => (
                <>
                  <div className="mt-1">
                    {checked && (
                      <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-white">{item.kode}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{item.deskripsi}</p>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

