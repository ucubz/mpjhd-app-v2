// src/utils/tentukanNilaiPokok.js

export function tentukanNilaiPokok({ pasal, kelompok, dampak, jabatan, tipeKelompokIII }) {
    if (!pasal || !kelompok) return 0;
  
    if (kelompok === 'II') {
      if (pasal.includes('Pasal 3 huruf a')) {
        return 60;
      }
      if (pasal.includes('Pasal 3 huruf b')) {
        return 30;
      }
      if (
        pasal.includes('Pasal 3 huruf c') ||
        pasal.includes('Pasal 3 huruf d') ||
        pasal.includes('Pasal 3 huruf e') ||
        pasal.includes('Pasal 3 huruf f') ||
        pasal.includes('Pasal 4 huruf c') ||
        pasal.includes('Pasal 4 huruf d') ||
        pasal.includes('Pasal 4 huruf g') ||
        pasal.includes('Pasal 4 huruf h') ||
        pasal.includes('Pasal 5 huruf f') ||
        pasal.includes('Pasal 5 huruf g') ||
        pasal.includes('Pasal 5 huruf h') ||
        pasal.includes('Pasal 5 huruf i') ||
        pasal.includes('Pasal 5 huruf j')
      ) {
        if (dampak === 'Unit Kerja') return 0;
        if (dampak === 'Instansi') return 30;
        if (dampak === 'Negara') return 60;
      }
    }
  
    if (kelompok === 'III' || kelompok === 'III Umum') {
      if (pasal.includes('Pasal 4 huruf a') || pasal.includes('Pasal 4 huruf b')) {
        return 30;
      }
      if (
        pasal.includes('Pasal 5 huruf a') ||
        pasal.includes('Pasal 5 huruf b') ||
        pasal.includes('Pasal 5 huruf c') ||
        pasal.includes('Pasal 5 huruf d') ||
        pasal.includes('Pasal 5 huruf e') ||
        pasal.includes('Pasal 5 huruf k') ||
        pasal.includes('Pasal 5 huruf l')
      ) {
        return 60;
      }
    }
  
    if (kelompok === 'IV') {
      return 30;
    }
  
    if (kelompok === 'V') {
      if (pasal.includes('Pasal 4 huruf e')) {
        if (jabatan === 'Pejabat Administrator' || jabatan === 'Pejabat Fungsional') {
          return 30;
        }
        if (jabatan === 'Pejabat Pimpinan Tinggi' || jabatan === 'Pejabat lainnya') {
          return 60;
        }
      }
      if (pasal.includes('Pasal 5 angka 2')) {
        return 30;
      }
      if (
        pasal.includes('Pasal 5 angka 3') ||
        pasal.includes('Pasal 5 angka 4') ||
        pasal.includes('Pasal 5 angka 5') ||
        pasal.includes('Pasal 5 angka 6') ||
        pasal.includes('Pasal 5 angka 7')
      ) {
        return 60;
      }
    }
  
    if (kelompok === 'VI') {
      return 60;
    }
  
    return 0;
  }
  