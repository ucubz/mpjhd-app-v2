// utils_v2/hitungFaktorMeringankan.js

/**
 * Menghitung total nilai faktor meringankan
 * - Kooperatif: +5
 * - Inisiator: +10
 * 
 * Keduanya dapat dipilih bersamaan.
 *
 * @param {boolean} kooperatif - Apakah pelaku kooperatif?
 * @param {boolean} inisiator - Apakah pelaku inisiator pengungkapan?
 * @returns {number} Total nilai faktor meringankan
 */
export function hitungFaktorMeringankan(kooperatif, inisiator) {
  let meringankan = 0;

  if (kooperatif) meringankan += 5;
  if (inisiator) meringankan += 10;

  return meringankan;
}
