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

/**
 * Menentukan opsi meringankan mana saja yang relevan berdasarkan kelompok aktif.
 * 
 * @param {string} kelompokKey - Contoh: 'III_INDIVIDU', 'V', dll.
 * @returns {Array<string>} Daftar field meringankan yang tersedia
 */
export function getAvailableMeringankanOptions(kelompokKey) {
  const allowed = {
    default: ['kooperatif'],
    III_INDIVIDU: ['kooperatif', 'inisiator'],
    V: ['kooperatif', 'inisiator'],
  };

  return allowed[kelompokKey] || allowed.default;
}
