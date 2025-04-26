import React from 'react';

const formatPembobotan = (obj) => {
  const map = {
    banyakPasal: "Lebih dari 1 pasal dilanggar",
    pernahDihukum: "Pernah dijatuhi hukuman sebelumnya",
    kesengajaan: "Dilakukan dengan unsur kesengajaan",
    hambatPemeriksaan: "Menghambat proses pemeriksaan"
  };
  return Object.entries(obj)
    .filter(([_, val]) => val)
    .map(([key]) => `✔ ${map[key]}`)
    .join(', ') || 'Tidak ada';
};

const formatMeringankan = (obj) => {
  const map = {
    kooperatif: "Kooperatif",
    mengakui: "Mengakui kesalahan",
    menyesal: "Menunjukkan penyesalan",
    tekanan: "Ada tekanan psikis"
  };
  return Object.entries(obj)
    .filter(([_, val]) => val)
    .map(([key]) => `✔ ${map[key]}`)
    .join(', ') || 'Tidak ada';
};

const HasilTabel = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Ringkasan Hasil Perhitungan</h2>
      <table className="w-full text-sm border border-collapse">
        <thead className="bg-blue-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="border px-4 py-2 text-gray-800 dark:text-gray-100">Komponen</th>
            <th className="border px-4 py-2 text-gray-800 dark:text-gray-100">Nilai</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Kategori", value: data.kategori },
            { label: "Pasal Utama", value: data.pasalUtama || '-' },
            { label: "Kelompok", value: data.kelompok },
            { label: "Nilai Pokok", value: data.nilaiPokok },
            { label: "Status", value: data.status + (data.status === 'bersama' ? ` (${data.peran})` : '') },
            { label: "Pembobotan", value: formatPembobotan(data.pembobotan) },
            { label: "Meringankan", value: formatMeringankan(data.meringankan) },
            { label: "Nilai Akhir", value: data.nilaiAkhir },
            { label: "Grade", value: data.grade },
            { label: "Jenis Hukuman", value: data.jenisHukuman }
          ].map((item, index) => (
            <tr key={index} className="even:bg-gray-50 dark:even:bg-gray-700">
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-200">{item.label}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-200">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HasilTabel;
