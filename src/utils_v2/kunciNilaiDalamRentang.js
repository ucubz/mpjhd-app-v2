import { tentukanRentang } from './rentangNilaiHukumanDisiplin';

/**
 * Mengunci Nilai Akhir pada tingkat hukuman milik Nilai Pokok.
 *  - Nilai Akhir lebih rendah dari Nilai Pokok -> Nilai Pokok + 1
 *  - Nilai Akhir sama dengan Nilai Pokok -> tetap Nilai Pokok (keputusan pengguna)
 *  - Nilai Akhir melewati batas tingkat -> jenis hukuman tertinggi tingkat itu
 */
export function kunciNilaiDalamRentang(nilaiPokok, nilaiHitung) {
  const pokok = Number(nilaiPokok) || 0;
  const hitung = Number(nilaiHitung) || 0;
  const { min, max } = tentukanRentang(pokok);
  if (hitung < pokok) return min;
  if (hitung > max) return max;
  return hitung;
}
