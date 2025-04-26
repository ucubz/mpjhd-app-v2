// src/utils/hitungNilaiAkhir.js

export function hitungNilaiAkhir(state) {
    const { kelompok, nilaiPokok, faktorUtama = 0, faktorPeran = 0, faktorTambahan = 0, faktorMeringankan = 0 } = state;
  
    let nilaiAkhir = 0;
  
    switch (kelompok) {
      case 'II':
        // Kelompok II: nilai pokok + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'III':
      case 'III Umum':
        // Kelompok III Umum: nilai pokok + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'III Khusus Individual':
        // Kelompok III Khusus Individual: nilai pokok + faktor utama + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorUtama || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'III Khusus Bersama':
        // Kelompok III Khusus Bersama: nilai pokok + faktor peran + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorPeran || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'IV':
        // Kelompok IV: nilai pokok + faktor utama + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorUtama || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'V':
        // Kelompok V: nilai pokok + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      case 'VI':
        // Kelompok VI: nilai pokok + faktor utama + faktor tambahan - faktor meringankan
        nilaiAkhir = (nilaiPokok || 0) + (faktorUtama || 0) + (faktorTambahan || 0) - (faktorMeringankan || 0);
        break;
  
      default:
        nilaiAkhir = 0;
        break;
    }
  
    // Supaya tidak minus
    return Math.max(0, nilaiAkhir);
  }
  