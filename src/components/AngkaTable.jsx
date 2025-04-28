// src/components/AngkaTable.jsx

export default function AngkaTable({ state }) {
  if (!state) return null;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200 w-1/12">No</th>
            <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200">Unsur Unsur</th>
            <th className="p-2 border font-bold text-center text-gray-700 dark:text-gray-200 w-1/6">Jumlah</th>
          </tr>
        </thead>
        <tbody>

          {/* Nilai Pokok */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right">1.</td>
            <td className="p-2 border">Nilai Pokok</td>
            <td className="p-2 border text-right">{state.nilaiPokok ?? ''}</td>
          </tr>

          {/* Nilai Tambahan */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right">2.</td>
            <td className="p-2 border">Nilai Tambahan</td>
            <td className="p-2 border text-right">{state.nilaiTambahan ?? ''}</td>
          </tr>

          {/* Faktor Tambahan */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right">2.1.</td>
            <td className="p-2 border">Faktor Pembobotan Tambahan</td>
            <td className="p-2 border text-right"></td>
          </tr>

          {/* Sub Faktor Tambahan */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right"></td>
            <td className="p-2 border pl-8">Jumlah Pasal</td>
            <td className="p-2 border text-right">{state.faktorTambahanJumlahPasal ?? 0}</td>
          </tr>
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right"></td>
            <td className="p-2 border pl-8">Rekam Jejak</td>
            <td className="p-2 border text-right">{state.faktorTambahanRekamJejak ?? 0}</td>
          </tr>
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right"></td>
            <td className="p-2 border pl-8">Kesengajaan</td>
            <td className="p-2 border text-right">{state.faktorTambahanKesengajaan ?? 0}</td>
          </tr>
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right"></td>
            <td className="p-2 border pl-8">Hambatan Pemeriksaan</td>
            <td className="p-2 border text-right">{state.faktorTambahanHambatan ?? 0}</td>
          </tr>

          {/* Faktor Meringankan */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right">2.2.</td>
            <td className="p-2 border pl-8">Faktor Meringankan</td>
            <td className="p-2 border text-right">({state.faktorMeringankanNilai ?? 0})</td>
          </tr>

          {/* Nilai Akhir */}
          <tr className="even:bg-gray-50 dark:even:bg-gray-700">
            <td className="p-2 border text-right">3.</td>
            <td className="p-2 border">Nilai Akhir</td>
            <td className="p-2 border text-right">{state.nilaiAkhir ?? ''}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}