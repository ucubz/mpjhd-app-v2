// utils_v2/konversiGrade.js

export function konversiGrade(nilaiAkhir) {
    if (nilaiAkhir <= 10) return { grade: 'Grade 01', hukuman: 'Teguran Lisan' };
    if (nilaiAkhir <= 20) return { grade: 'Grade 02', hukuman: 'Teguran Tertulis' };
    if (nilaiAkhir <= 30) return { grade: 'Grade 03', hukuman: 'Pernyataan Tidak Puas Secara Tertulis' };
    if (nilaiAkhir <= 40) return { grade: 'Grade 04', hukuman: 'Pemotongan Tunjangan Kinerja 25% selama 6 bulan' };
    if (nilaiAkhir <= 50) return { grade: 'Grade 05', hukuman: 'Pemotongan Tunjangan Kinerja 25% selama 9 bulan' };
    if (nilaiAkhir <= 60) return { grade: 'Grade 06', hukuman: 'Pemotongan Tunjangan Kinerja 25% selama 12 bulan' };
    if (nilaiAkhir <= 70) return { grade: 'Grade 07', hukuman: 'Penurunan Jabatan Setingkat Lebih Rendah selama 12 bulan' };
    if (nilaiAkhir <= 80) return { grade: 'Grade 08', hukuman: 'Pembebasan dari Jabatan' };
    return { grade: 'Grade 09', hukuman: 'Pemberhentian dengan Hormat Tidak Atas Permintaan Sendiri' };
  }
  