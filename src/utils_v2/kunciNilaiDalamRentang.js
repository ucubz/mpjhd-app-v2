import { tentukanRentang } from './rentangNilaiHukumanDisiplin';

/**
 * Mengunci Nilai Akhir pada tingkat hukuman milik Nilai Pokok.
 *  Tingkat (keputusan pengguna): Ringan 0 < x <= 30 (pokok 0), Sedang 30 < x <= 60 (pokok 30),
 *  Berat 60 < x (pokok 60). Jadi Nilai Akhir yang sama dengan Nilai Pokok tetap masuk tingkat
 *  milik Nilai Pokok, dengan jenis hukuman terendah tingkat itu.
 *  - Nilai Akhir <= Nilai Pokok -> Nilai Pokok + 1 (jenis hukuman terendah tingkat itu)
 *  - Nilai Akhir melewati batas tingkat -> jenis hukuman tertinggi tingkat itu
 */
export function kunciNilaiDalamRentang(nilaiPokok, nilaiHitung) {
  const pokok = Number(nilaiPokok) || 0;
  const hitung = Number(nilaiHitung) || 0;
  const { min, max } = tentukanRentang(pokok);
  if (hitung <= pokok) return min;
  if (hitung > max) return max;
  return hitung;
}
