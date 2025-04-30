// utils_v2/hitungNilaiAkhir.js

/**
 * Menghitung nilai akhir MPJHD
 * Nilai Akhir = Nilai Pokok + Faktor Utama + Faktor Tambahan - Faktor Meringankan
 *
 * @param {number} nilaiPokok - Nilai pokok berdasarkan pasal dan dampak.
 * @param {number} faktorUtama - Nilai faktor utama (opsional).
 * @param {number} faktorTambahan - Nilai faktor tambahan (opsional).
 * @param {number} faktorMeringankan - Nilai faktor meringankan (opsional).
 * @returns {number} Nilai akhir sebelum dikunci dalam rentang hukuman.
 */
export function hitungNilaiAkhir(nilaiPokok, faktorUtama = 0, faktorTambahan = 0, faktorMeringankan = 0) {
  return nilaiPokok + faktorUtama + faktorTambahan - faktorMeringankan;
}
