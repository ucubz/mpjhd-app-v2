// utils_v2/tentukanNilaiPokok.js

/**
 * Menentukan nilai pokok berdasarkan kelompok, pasal, dampak, dan jabatan.
 * @param {string} kelompok
 * @param {string} pasal
 * @param {string} dampak - 'Unit Kerja', 'Instansi', 'Negara'
 * @param {string} jabatan - 'Administrator', 'Fungsional', 'Pimpinan Tinggi', 'Lainnya'
 * @returns {number} Nilai Pokok
 */
export function tentukanNilaiPokok(kelompok, pasal, dampak = '', jabatan = '') {
  if (!kelompok) return 0;

  if (kelompok === 'I') return 0;
  if (kelompok === 'VI') return 60;

  if (kelompok === 'V') {
      if (pasal.includes('Pasal 4 huruf e')) {
          if (jabatan === 'Administrator' || jabatan === 'Fungsional') return 30;
          return 60;
      }
      if (pasal.includes('Pasal 5 angka 2')) return 30;
      if (['Pasal 5 angka 3', 'Pasal 5 angka 4', 'Pasal 5 angka 5', 'Pasal 5 angka 6', 'Pasal 5 angka 7']
          .some(p => pasal.includes(p))) return 60;
  }

  if (kelompok === 'IV') return 30;

  if (kelompok === 'III') {
      if (['Pasal 4 huruf a', 'Pasal 4 huruf b'].some(p => pasal.includes(p))) return 30;
      if ([
          'Pasal 5 huruf a', 'Pasal 5 huruf b', 'Pasal 5 huruf c',
          'Pasal 5 huruf d', 'Pasal 5 huruf e', 'Pasal 5 huruf k', 'Pasal 5 huruf l'
      ].some(p => pasal.includes(p))) return 60;
  }

  if (kelompok === 'II') {
      if (pasal.includes('Pasal 3 huruf a')) return 60;
      if (pasal.includes('Pasal 3 huruf b')) {
          if (dampak === 'Negara') return 60;
          return 30;
      }
      if ([
          'Pasal 3 huruf c', 'Pasal 3 huruf d', 'Pasal 3 huruf e', 'Pasal 3 huruf f',
          'Pasal 4 huruf c', 'Pasal 4 huruf d', 'Pasal 4 huruf g', 'Pasal 4 huruf h',
          'Pasal 5 huruf f', 'Pasal 5 huruf g', 'Pasal 5 huruf h', 'Pasal 5 huruf i', 'Pasal 5 huruf j'
      ].some(p => pasal.includes(p))) {
          if (dampak === 'Negara') return 60;
          if (dampak === 'Instansi') return 30;
          return 0; // Unit Kerja
      }
  }

  return 0;
}
