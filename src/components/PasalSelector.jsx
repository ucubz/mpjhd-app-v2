
import React from 'react';

const pasalList = {
  kewajiban: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia dan taat kepada Pancasila, UUD 1945, NKRI, dan pemerintah' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat yang berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kesadaran, dan tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan kepada setiap orang' },
    { kode: 'Pasal 3 huruf g', deskripsi: 'Menyimpan rahasia jabatan' },
    { kode: 'Pasal 3 huruf h', deskripsi: 'Bersedia ditempatkan di seluruh wilayah NKRI' },
    { kode: 'Pasal 4 huruf a', deskripsi: 'Mengutamakan kepentingan negara dari kepentingan pribadi atau golongan' },
    { kode: 'Pasal 4 huruf b', deskripsi: 'Menghindari konflik kepentingan dalam pelaksanaan tugas' },
    { kode: 'Pasal 4 huruf c', deskripsi: 'Memberikan pelayanan sebaik-baiknya kepada masyarakat' },
    { kode: 'Pasal 4 huruf d', deskripsi: 'Bertindak dan menjadi perekat persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 4 huruf e', deskripsi: 'Melaporkan harta kekayaan sesuai dengan ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 4 huruf f', deskripsi: 'Masuk kerja dan menaati ketentuan jam kerja' },
    { kode: 'Pasal 4 huruf g', deskripsi: 'Menaati perintah atasan yang sah' },
    { kode: 'Pasal 4 huruf h', deskripsi: 'Menjaga netralitas' },
    { kode: 'Pasal 4 huruf i', deskripsi: 'Menggunakan dan memelihara barang milik negara secara tertib dan bertanggung jawab' },
    { kode: 'Pasal 4 huruf j', deskripsi: 'Melaksanakan tugas kedinasan sesuai dengan perintah atasan' },
    { kode: 'Pasal 4 huruf k', deskripsi: 'Menaati ketentuan peraturan kedinasan yang ditetapkan oleh pejabat yang berwenang' }
  ],
  larangan: [
    { kode: 'Pasal 5 huruf a', deskripsi: 'Menyalahgunakan wewenang' },
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara untuk mendapatkan keuntungan pribadi dan/atau orang lain' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Tanpa izin pejabat yang berwenang menjadi pegawai atau bekerja pada pihak lain' },
    { kode: 'Pasal 5 huruf d', deskripsi: 'Memiliki, menjual, membeli, menggadaikan, menyewakan, atau meminjamkan barang milik negara' },
    { kode: 'Pasal 5 huruf e', deskripsi: 'Melakukan pungutan tidak sah dalam bentuk apapun dalam pelaksanaan tugasnya' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Melakukan kegiatan yang merugikan negara' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Menjadi anggota dan/atau pengurus partai politik' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Ikut serta dalam kegiatan politik praktis' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Memberikan dukungan kepada calon presiden/wakil presiden, DPR, DPD, DPRD, atau kepala daerah' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Memberikan dukungan kepada pasangan calon independen' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Melakukan tindakan yang bertentangan dengan ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Melakukan perbuatan tercela yang dapat merusak wibawa dan kehormatan negara' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Bertindak sewenang-wenang terhadap bawahan' },
    { kode: 'Pasal 5 huruf n', deskripsi: 'Melakukan pungutan tidak sah terhadap masyarakat' },
    { kode: 'Pasal 5 huruf o', deskripsi: 'Bersikap tidak sopan terhadap atasan, rekan kerja, dan/atau bawahan' },
    { kode: 'Pasal 5 huruf p', deskripsi: 'Melakukan tindakan yang merugikan pihak lain' },
    { kode: 'Pasal 5 huruf q', deskripsi: 'Menyalahgunakan barang milik negara untuk kepentingan pribadi' },
    { kode: 'Pasal 5 huruf r', deskripsi: 'Menjadi perantara atas dasar jabatan untuk keuntungan pribadi/orang lain' },
    { kode: 'Pasal 5 huruf s', deskripsi: 'Bekerja rangkap yang melanggar ketentuan' },
    { kode: 'Pasal 5 huruf t', deskripsi: 'Melakukan perbuatan tercela lainnya yang tidak sesuai dengan norma yang berlaku' }
  ]
};

const PasalSelector = ({ kategori, selected, onChange }) => {
  const list = pasalList[kategori] || [];
  const deskripsiPasal = list.find((item) => item.kode === selected)?.deskripsi || '';

  return (
    <div className="my-4">
      <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
        Pilih Pasal yang Dilanggar
      </label>

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full"
      >
        <option value="">-- Pilih Pasal --</option>
        {list.map((item, i) => (
          <option key={i} value={item.kode}>
            {item.kode}
          </option>
        ))}
      </select>

      {selected && (
        <div className="mt-2 p-3 rounded border bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
          <strong>Deskripsi:</strong> {deskripsiPasal}
        </div>
      )}
    </div>
  )
}

export default PasalSelector