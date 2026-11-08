/**
 * Faktor meringankan (PMK 123/2023): kooperatif = 5, inisiator pengungkapan = 10.
 * Keduanya dapat dipilih bersamaan.
 */
export const NILAI_KOOPERATIF = 5;
export const NILAI_INISIATOR = 10;

export function hitungFaktorMeringankan(kooperatif, inisiator) {
  return (kooperatif ? NILAI_KOOPERATIF : 0) + (inisiator ? NILAI_INISIATOR : 0);
}

/**
 * Opsi meringankan yang tersedia. Semua kelompok selain I memakai keduanya.
 * Catatan inisiator: berlaku bila pelanggaran dilakukan bersama-sama oleh lebih
 * dari satu Terperiksa dan diungkap/dilaporkan ke UKI/Inspektorat Jenderal
 * (TODO(keputusan): hanya ditampilkan sebagai catatan, tidak dikunci).
 */
export function getAvailableMeringankanOptions(kelompokKey) {
  if (String(kelompokKey).toUpperCase() === 'I') return [];
  return ['kooperatif', 'inisiator'];
}
