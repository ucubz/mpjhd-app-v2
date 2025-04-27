// utils_v2/tentukanKelompok.js

export function tentukanKelompok(pasal) {
    if (!pasal) return '';
  
    if (pasal.includes('Pasal 4 huruf f')) return 'I';
    if ([
      'Pasal 3 huruf a', 'Pasal 3 huruf b', 'Pasal 3 huruf c', 'Pasal 3 huruf d', 'Pasal 3 huruf e', 'Pasal 3 huruf f',
      'Pasal 4 huruf c', 'Pasal 4 huruf d', 'Pasal 4 huruf g', 'Pasal 4 huruf h',
      'Pasal 5 huruf f', 'Pasal 5 huruf g', 'Pasal 5 huruf h', 'Pasal 5 huruf i', 'Pasal 5 huruf j'
    ].some(p => pasal.includes(p))) return 'II';
    if ([
      'Pasal 4 huruf a', 'Pasal 4 huruf b',
      'Pasal 5 huruf a', 'Pasal 5 huruf b', 'Pasal 5 huruf c', 'Pasal 5 huruf d', 'Pasal 5 huruf e', 'Pasal 5 huruf k', 'Pasal 5 huruf l'
    ].some(p => pasal.includes(p))) return 'III';
    if (pasal.includes('Pasal 5 huruf m')) return 'IV';
    if (
      pasal.includes('Pasal 4 huruf e') ||
      ['Pasal 5 angka 2', 'Pasal 5 angka 3', 'Pasal 5 angka 4', 'Pasal 5 angka 5', 'Pasal 5 angka 6', 'Pasal 5 angka 7']
        .some(p => pasal.includes(p))
    ) return 'V';
    if (pasal.includes('Terkait Izin Perkawinan') || pasal.includes('Terkait Izin Perceraian')) return 'VI';
  
    return 'Tidak Memiliki Kelompok';
  }
  