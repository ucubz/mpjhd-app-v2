import React from 'react';

const pasalList = {
  KEWAJIBAN: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia dan taat sepenuhnya kepada Pancasila, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Negara Kesatuan Republik Indonesia, dan Pemerintah' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat pemerintah yang berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kejujuran, kesadaran, dan tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan kepada setiap orang, baik di dalam maupun di luar kedinasan' },
    { kode: 'Pasal 3 huruf g', deskripsi: 'Menyimpan rahasia jabatan dan hanya dapat mengemukakan rahasia jabatan sesuai dengan ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf h', deskripsi: 'Bersedia ditempatkan di seluruh wilayah Negara Kesatuan Republik Indonesia' },
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
  LARANGAN: [
    { kode: 'Pasal 5 huruf a', deskripsi: 'Menyalahgunakan wewenang' },
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara untuk mendapatkan keuntungan pribadi dan/atau orang lain dengan menggunakan kewenangan orang lain yang diduga terjadi konflik kepentingan dengan jabatan' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Menjadi pegawai atau bekerja untuk negara lain' },
    { kode: 'Pasal 5 huruf d', deskripsi: 'Bekerja pada lembaga atau organisasi internasional tanpa izin atau tanpa ditugaskan oleh Pejabat Pembina Kepegawaian' },
    { kode: 'Pasal 5 huruf e', deskripsi: 'Bekerja pada perusahaan asing, konsultan asing, atau lembaga swadaya masyarakat asing kecuali ditugaskan oleh Pejabat Pembina Kepegawaian' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Memiliki, menjual, membeli, menggadaikan, menyewakan, atau meminjamkan barang baik bergerak atau tidak bergerak, dokumen, atau surat berharga milik negara secara tidak sah' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Melakukan pungutan di luar ketentuan' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Melakukan kegiatan yang merugikan negara' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Bertindak sewenang-wenang terhadap bawahan' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Menghalangi berjalannya tugas kedinasan' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Menerima hadiah yang berhubungan dengan jabatan dan/atau pekerjaan' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Meminta sesuatu yang berhubungan dengan jabatan' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Melakukan tindakan atau tidak melakukan tindakan yang dapat mengakibatkan kerugian bagi yang dilayani' },
    { kode: 'Pasal 5 huruf n', deskripsi: 'Memberikan dukungan kepada calon Presiden/Wakil Presiden, calon Kepala Daerah/Wakil Kepala Daerah, calon anggota Dewan Perwakilan Rakyat, calon anggota Dewan Perwakilan Daerah, atau calon anggota Dewan Perwakilan Rakyat Daerah dengan cara' },
    { kode: 'Pasal 5 huruf o', deskripsi: 'Ikut kampanye' },
    { kode: 'Pasal 5 huruf p', deskripsi: 'Menjadi peserta kampanye dengan menggunakan atribut partai atau atribut PNS' },
    { kode: 'Pasal 5 huruf q', deskripsi: 'Sebagai peserta kampanye dengan mengerahkan PNS lain' },
    { kode: 'Pasal 5 huruf r', deskripsi: 'Sebagai peserta kampanye dengan menggunakan fasilitas negara' },
    { kode: 'Pasal 5 huruf s', deskripsi: 'Membuat keputusan dan/atau tindakan yang menguntungkan atau merugikan salah satu pasangan calon sebelum, selama, dan sesudah masa kampanye' },
    { kode: 'Pasal 5 huruf t', deskripsi: 'Mengadakan kegiatan yang mengarah kepada keberpihakan terhadap pasangan calon yang menjadi peserta pemilu sebelum, selama, dan sesudah masa kampanye' }
  ]
};

const PasalSelector = ({ kategori, selected, onChange }) => {
  const list = pasalList[kategori] || [];

  // Group berdasarkan nomor pasal (3, 4, 5)
  const grouped = list.reduce((acc, item) => {
    const nomorPasal = item.kode.split(' ')[1]; // ambil angka setelah "Pasal"
    if (!acc[nomorPasal]) acc[nomorPasal] = [];
    acc[nomorPasal].push(item);
    return acc;
  }, {});

  const deskripsiPasal = list.find((item) => item.kode === selected)?.deskripsi || '';

  if (!kategori) {
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        Silakan pilih kategori terlebih dahulu.
      </p>
    );
  }

  return (
    <div className="my-4">
      <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
        Pilih Pasal yang Dilanggar
      </label>

      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-2 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full"
      >
        <option value="">-- Pilih Pasal --</option>
        {Object.keys(grouped).sort().map((group) => (
          <optgroup key={group} label={`Pasal ${group}`}>
            {grouped[group].map((item, idx) => (
              <option key={idx} value={item.kode}>
                {item.kode}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {selected && (
        <div className="mt-2 p-3 rounded border bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
          <strong>Deskripsi:</strong> {deskripsiPasal}
        </div>
      )}
    </div>
  );
};

export default PasalSelector;
