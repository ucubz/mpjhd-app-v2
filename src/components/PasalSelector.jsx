import React from 'react';

const pasalList = {
  KEWAJIBAN: [
    { kode: 'Pasal 3 huruf a', deskripsi: 'Setia dan taat kepada Pancasila, UUD 1945, NKRI, dan pemerintah' },
    { kode: 'Pasal 3 huruf b', deskripsi: 'Menjaga persatuan dan kesatuan bangsa' },
    { kode: 'Pasal 3 huruf c', deskripsi: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat yang berwenang' },
    { kode: 'Pasal 3 huruf d', deskripsi: 'Menaati ketentuan peraturan perundang-undangan' },
    { kode: 'Pasal 3 huruf e', deskripsi: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kesadaran, dan tanggung jawab' },
    { kode: 'Pasal 3 huruf f', deskripsi: 'Menunjukkan integritas dan keteladanan' },
    { kode: 'Pasal 3 huruf g', deskripsi: 'Menyimpan rahasia jabatan' },
    { kode: 'Pasal 3 huruf h', deskripsi: 'Bersedia ditempatkan di seluruh wilayah NKRI' },
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
    { kode: 'Pasal 5 huruf b', deskripsi: 'Menjadi perantara keuntungan pribadi' },
    { kode: 'Pasal 5 huruf c', deskripsi: 'Bekerja tanpa izin' },
    { kode: 'Pasal 5 huruf d', deskripsi: 'Menggunakan barang milik negara' },
    { kode: 'Pasal 5 huruf e', deskripsi: 'Pungutan tidak sah' },
    { kode: 'Pasal 5 huruf f', deskripsi: 'Merugikan negara' },
    { kode: 'Pasal 5 huruf g', deskripsi: 'Menjadi anggota partai politik' },
    { kode: 'Pasal 5 huruf h', deskripsi: 'Politik praktis' },
    { kode: 'Pasal 5 huruf i', deskripsi: 'Memberi dukungan politik' },
    { kode: 'Pasal 5 huruf j', deskripsi: 'Dukungan calon independen' },
    { kode: 'Pasal 5 huruf k', deskripsi: 'Tindakan bertentangan hukum' },
    { kode: 'Pasal 5 huruf l', deskripsi: 'Perbuatan tercela' },
    { kode: 'Pasal 5 huruf m', deskripsi: 'Sewenang-wenang terhadap bawahan' },
    { kode: 'Pasal 5 huruf n', deskripsi: 'Pungutan tidak sah terhadap masyarakat' },
    { kode: 'Pasal 5 huruf o', deskripsi: 'Bersikap tidak sopan' },
    { kode: 'Pasal 5 huruf p', deskripsi: 'Merugikan pihak lain' },
    { kode: 'Pasal 5 huruf q', deskripsi: 'Penyalahgunaan barang negara' },
    { kode: 'Pasal 5 huruf r', deskripsi: 'Perantara keuntungan pribadi' },
    { kode: 'Pasal 5 huruf s', deskripsi: 'Bekerja rangkap melanggar aturan' },
    { kode: 'Pasal 5 huruf t', deskripsi: 'Perbuatan tercela lainnya' }
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
        className="border px-2 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full"
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
