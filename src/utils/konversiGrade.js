// src/utils/konversiGrade.js

export function konversiGrade(nilaiAkhir) {
    if (nilaiAkhir >= 80) {
      return { grade: 'Grade 09', jenisHukuman: 'Pemberhentian dengan hormat tidak atas permintaan sendiri' };
    } else if (nilaiAkhir >= 70) {
      return { grade: 'Grade 08', jenisHukuman: 'Pembebasan dari jabatannya menjadi jabatan pelaksana selama 12 bulan' };
    } else if (nilaiAkhir >= 60) {
      return { grade: 'Grade 07', jenisHukuman: 'Penurunan jabatan setingkat lebih rendah selama 12 bulan' };
    } else if (nilaiAkhir >= 50) {
      return { grade: 'Grade 06', jenisHukuman: 'Pemotongan tunjangan kinerja 25% selama 12 bulan' };
    } else if (nilaiAkhir >= 40) {
      return { grade: 'Grade 05', jenisHukuman: 'Pemotongan tunjangan kinerja 25% selama 9 bulan' };
    } else if (nilaiAkhir >= 30) {
      return { grade: 'Grade 04', jenisHukuman: 'Pemotongan tunjangan kinerja 25% selama 6 bulan' };
    } else if (nilaiAkhir >= 20) {
      return { grade: 'Grade 03', jenisHukuman: 'Pernyataan tidak puas secara tertulis' };
    } else if (nilaiAkhir >= 10) {
      return { grade: 'Grade 02', jenisHukuman: 'Teguran tertulis' };
    } else {
      return { grade: 'Grade 01', jenisHukuman: 'Teguran lisan' };
    }
  }
  