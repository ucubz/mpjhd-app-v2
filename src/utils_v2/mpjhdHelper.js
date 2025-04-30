// utils_v2/mpjhdHelper.js

/**
 * Format angka dengan pemisah ribuan sesuai lokal Indonesia.
 * @param {number} angka
 * @returns {string}
 */
export function formatAngka(angka) {
  return angka.toLocaleString('id-ID');
}

/**
* Memastikan input adalah angka positif (> 0).
* @param {number} input
* @returns {boolean}
*/
export function cekInputPositif(input) {
  return typeof input === 'number' && input > 0;
}

/**
* Menghitung total dari array angka.
* @param {number[]} angkaArray
* @returns {number}
*/
export function hitungTotal(angkaArray) {
  return angkaArray.reduce((total, angka) => total + angka, 0);
}
