// utils/hitungNilaiPokok.js

export function hitungNilaiPokokIIIKhususIndividual(jumlahKerugian) {
    if (jumlahKerugian <= 10000000) return 7.5;
    if (jumlahKerugian <= 50000000) return 15;
    if (jumlahKerugian <= 100000000) return 22.5;
    return 30;
  }
  
  export function hitungNilaiPokokIIIKhususBersama(peran) {
    if (peran === 'Pasif') return 10;
    if (peran === 'Aktif') return 20;
    if (peran === 'Inisiator') return 30;
    return 0;
  }
  
  export function hitungNilaiPokokIV(jumlahKerugian) {
    if (jumlahKerugian <= 50000000) return 15;
    return 22.5;
  }
  
  export function hitungNilaiPokokVI(dampak) {
    if (dampak === 'Tidak Berdampak') return 0;
    if (dampak === 'Unit Kerja') return 15;
    if (dampak === 'Instansi/Tersangka') return 30;
    return 0;
  }
  