// utils_v2/tentukanNilaiPokok.js

export function tentukanNilaiPokok(kelompok, pasal, jabatan = '') {
    if (!kelompok) return 0;
  
    if (kelompok === 'I') return 0; // Kelompok I dihitung khusus dari jumlah hari
    if (kelompok === 'VI') return 60; // Kelompok VI nilai pokok selalu 60
  
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
      if (['Pasal 5 huruf a', 'Pasal 5 huruf b', 'Pasal 5 huruf c', 'Pasal 5 huruf d', 'Pasal 5 huruf e', 'Pasal 5 huruf k', 'Pasal 5 huruf l']
        .some(p => pasal.includes(p))) return 60;
    }
  
    if (kelompok === 'II') {
      if (pasal.includes('Pasal 3 huruf a')) return 60;
      if (pasal.includes('Pasal 3 huruf b')) {
        if (pasal.includes('dampak negara')) return 60;
        return 30;
      }
      if ([
        'Pasal 3 huruf c', 'Pasal 3 huruf d', 'Pasal 3 huruf e', 'Pasal 3 huruf f',
        'Pasal 4 huruf c', 'Pasal 4 huruf d', 'Pasal 4 huruf g', 'Pasal 4 huruf h',
        'Pasal 5 huruf f', 'Pasal 5 huruf g', 'Pasal 5 huruf h', 'Pasal 5 huruf i', 'Pasal 5 huruf j'
      ].some(p => pasal.includes(p))) {
        if (pasal.includes('dampak negara')) return 60;
        if (pasal.includes('dampak instansi')) return 30;
        return 0;
      }
    }
  
    return 0;
  }
  