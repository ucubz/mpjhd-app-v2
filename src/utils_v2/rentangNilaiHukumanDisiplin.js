// utils_v2/rentangNilaiHukumanDisiplin.js
// Tingkat hukuman ditentukan oleh Nilai Pokok (PMK 123/2023, Lampiran II).
//   Ringan: Grade 01-03 (maks. nilai 30)
//   Sedang: Grade 04-06 (maks. nilai 60)
//   Berat : Grade 07-09 (di atas 60, tanpa batas atas)
// Faktor-faktor hanya boleh menggeser jenis hukuman di dalam tingkat yang sama.

export const BATAS_TINGKAT = [
  { tingkat: 'Ringan', pokokMin: 0, pokokMax: 29.99, nilaiMaks: 30 },
  { tingkat: 'Sedang', pokokMin: 30, pokokMax: 59.99, nilaiMaks: 60 },
  { tingkat: 'Berat', pokokMin: 60, pokokMax: Infinity, nilaiMaks: Infinity },
];

/**
 * @param {number} nilaiPokok
 * @returns {{tingkat:string, min:number, max:number}} min = batas bawah nilai akhir
 *  (selalu Nilai Pokok + 1, karena hasil sama dengan/di bawah Nilai Pokok
 *  dikembalikan ke jenis hukuman terendah pada tingkat tersebut).
 */
export function tentukanRentang(nilaiPokok) {
  const pokok = Number(nilaiPokok) || 0;
  const t = BATAS_TINGKAT.find((b) => pokok >= b.pokokMin && pokok <= b.pokokMax) || BATAS_TINGKAT[2];
  return { tingkat: t.tingkat, min: pokok + 1, max: t.nilaiMaks };
}
