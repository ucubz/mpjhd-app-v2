// utils_v2/hitungFaktorUtama.js

/**
 * Menghitung faktor utama untuk Kelompok III Khusus Individual
 * Berdasarkan jumlah kerugian.
 */
export function hitungFaktorUtamaIIIKhususIndividual(jumlahKerugian) {
  if (jumlahKerugian <= 10_000_000) return 7.5;
  if (jumlahKerugian <= 50_000_000) return 15;
  if (jumlahKerugian <= 100_000_000) return 22.5;
  return 30;
}

/**
* Menghitung faktor utama untuk Kelompok III Khusus Bersama-sama
* Berdasarkan peran pelaku dan jumlah kerugian.
*/
export function hitungFaktorUtamaIIIKhususBersama(peran, jumlahKerugian) {
  let nilaiPeran = 0;
  if (peran === 'Pasif') nilaiPeran = 10;
  else if (peran === 'Aktif') nilaiPeran = 20;
  else if (peran === 'Inisiator') nilaiPeran = 30;

  let nilaiKerugian = 0;
  if (jumlahKerugian <= 10_000_000) nilaiKerugian = 2.5;
  else if (jumlahKerugian <= 50_000_000) nilaiKerugian = 5;
  else if (jumlahKerugian <= 100_000_000) nilaiKerugian = 7.5;
  else nilaiKerugian = 10;

  return nilaiPeran + nilaiKerugian;
}

/**
* Menghitung faktor utama untuk Kelompok IV
* Berdasarkan kerugian pihak yang dilayani.
*/
export function hitungFaktorUtamaIV(jumlahKerugian) {
  if (jumlahKerugian <= 50_000_000) return 15;
  return 22.5;
}

/**
* Menghitung faktor utama untuk Kelompok VI
* Berdasarkan dampak reputasi/tugas.
*/
export function hitungFaktorUtamaVI(dampak) {
  if (dampak === 'Tidak Berdampak') return 0;
  if (dampak === 'Unit Kerja') return 15;
  if (dampak === 'Instansi/Tersangka') return 30;
  return 0;
}
