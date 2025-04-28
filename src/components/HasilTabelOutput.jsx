// src/components/HasilTabelOutput.jsx

export default function HasilTabelOutput({ kelompok, hasilState }) {
  if (!kelompok || !hasilState) return null;

  const { nilaiPokok, faktorPembobotan, faktorMeringankan, nilaiAkhir, grade, jenisHukuman } = hasilState;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-2 border font-bold text-gray-700 dark:text-gray-200 w-1/2">Unsur</th>
            <th className="p-2 border font-bold text-gray-700 dark:text-gray-200">Nilai</th>
          </tr>
        </thead>
        <tbody>

          {/* Nilai Pokok */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-gray-700 dark:text-gray-300">Nilai Pokok Pelanggaran</td>
            <td className="p-2 border text-gray-700 dark:text-gray-300">{nilaiPokok}</td>
          </tr>

          {/* Faktor Pembobotan */}
          {faktorPembobotan && (
            <>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Pembobotan Banyak Pasal</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorPembobotan.banyakPasal}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Pembobotan Riwayat Hukdis</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorPembobotan.hukdis}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Pembobotan Kesengajaan</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorPembobotan.kesengajaan}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Pembobotan Hambatan</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorPembobotan.hambatan}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Pembobotan Faktor Meringankan</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorPembobotan.meringankan}</td>
              </tr>
            </>
          )}

          {/* Faktor Meringankan Tambahan */}
          {faktorMeringankan && (
            <>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Kooperatif</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorMeringankan.kooperatif ? 'Ya' : 'Tidak'}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Mengakui Kesalahan</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorMeringankan.mengakui ? 'Ya' : 'Tidak'}</td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-700">
                <td className="p-2 border text-gray-700 dark:text-gray-300">Memperbaiki Kerugian</td>
                <td className="p-2 border text-gray-700 dark:text-gray-300">{faktorMeringankan.memperbaiki ? 'Ya' : 'Tidak'}</td>
              </tr>
            </>
          )}

          {/* Nilai Akhir dan Hukuman */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">Nilai Akhir</td>
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">{nilaiAkhir}</td>
          </tr>
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">Grade Hukuman</td>
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">{grade}</td>
          </tr>
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">Jenis Hukuman Disiplin</td>
            <td className="p-2 border font-semibold text-gray-700 dark:text-gray-200">{jenisHukuman}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}