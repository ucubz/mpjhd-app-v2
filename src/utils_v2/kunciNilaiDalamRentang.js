import { tentukanRentang } from './rentangNilaiHukumanDisiplin';

/**
 * Mengunci Nilai Akhir pada tingkat hukuman milik Nilai Pokok.
 *  - Nilai Akhir <= Nilai Pokok -> jenis hukuman terendah tingkat itu (Nilai Pokok + 1)
 *    TODO(keputusan): PMK diam untuk Nilai Akhir == Nilai Pokok; diperlakukan sama dengan "di bawah".
 *  - Nilai Akhir melewati batas tingkat -> jenis hukuman tertinggi tingkat itu.
 *
 * @param {number|string} nilaiPokok
 * @param {number|string} nilaiHitung - Nilai Akhir sebelum dikunci
 * @returns {number}
 */
export function kunciNilaiDalamRentang(nilaiPokok, nilaiHitung) {
  const hitung = Number(nilaiHitung) || 0;
  const { min, max } = tentukanRentang(nilaiPokok);
  if (hitung < min) return min;
  if (hitung > max) return max;
  return hitung;
}
