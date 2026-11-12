// utils_v2/tentukanNilaiPokok.js

const JABATAN_NILAI_30 = ['Pejabat Administrator', 'Pejabat Fungsional'];

// Pasal yang tidak diatur di tabel PMK 123/2023. Keputusan pengguna: masuk Kelompok V,
// nilai pokok mengikuti angka terendah Kelompok V (30), dengan peringatan di layar.
export const PASAL_BELUM_DIATUR = ['Pasal 5 huruf n angka 1'];

export function pasalBelumDiatur(pasal = '') {
  return PASAL_BELUM_DIATUR.some((p) => pasal === p);
}

/**
 * Menentukan nilai pokok berdasarkan kelompok, pasal, dampak, dan jabatan.
 * @param {string} kelompok
 * @param {string} pasal - contoh 'Pasal 5 huruf n angka 2'
 * @param {string} dampak - 'Unit Kerja' | 'Instansi' | 'Negara'
 * @param {string} jabatan - 'Pejabat Administrator' | 'Pejabat Fungsional' | 'Pejabat Pimpinan Tinggi' | 'Pejabat lainnya'
 */
export function tentukanNilaiPokok(kelompok, pasal = '', dampak = '', jabatan = '') {
  if (!kelompok) return 0;
  if (pasal === 'Pasal 5 huruf n angka 1') return 30;

  if (kelompok === 'I') return 0;
  if (kelompok === 'VI') return 60;
  if (kelompok === 'IV') return 30;

  if (kelompok === 'V') {
    if (pasal === 'Pasal 4 huruf e') return JABATAN_NILAI_30.includes(jabatan) ? 30 : 60;
    const m = /^Pasal 5 huruf n angka (\d)$/.exec(pasal);
    if (m) {
      const angka = Number(m[1]);
      if (angka === 2) return 30;
      if (angka >= 3 && angka <= 7) return 60;
    }
    return 0;
  }

  if (kelompok === 'III') {
    if (['Pasal 4 huruf a', 'Pasal 4 huruf b'].includes(pasal)) return 30;
    if (['a', 'b', 'c', 'd', 'e', 'k', 'l'].some((h) => pasal === `Pasal 5 huruf ${h}`)) return 60;
    if (pasal === 'Pasal 4 huruf i') return 60;
    return 0;
  }

  if (kelompok === 'II') {
    if (pasal === 'Pasal 3 huruf a') return 60;
    if (pasal === 'Pasal 3 huruf b') return dampak === 'Negara' ? 60 : 30;
    if (dampak === 'Negara') return 60;
    if (dampak === 'Instansi') return 30;
    return 0; // Unit Kerja
  }

  return 0;
}
