// utils_v2/konversiGrade.js

export function konversiGrade(nilaiAkhir) {
    if (nilaiAkhir <= 10) return { grade: 'Grade 01', hukuman: 'Teguran Lisan' };
    if (nilaiAkhir <= 20) return { grade: 'Grade 02', hukuman: 'Teguran Tertulis' };
    if (nilaiAkhir <= 30) return { grade: 'Grade 03', hukuman: 'Pernyataan Tidak Puas Secara Tertulis' };
    if (nilaiAkhir <= 40) return { grade: 'Grade 04', hukuman: 'Penundaan kenaikan gaji berkala selama 1 tahun (PP 53/2010)' };
    if (nilaiAkhir <= 50) return { grade: 'Grade 05', hukuman: 'Penundaan kenaikan pangkat selama 1 tahun (PP 53/2010)' };
    if (nilaiAkhir <= 60) return { grade: 'Grade 06', hukuman: 'Penurunan pangkat setingkat lebih rendah selama 1 tahun (PP 53/2010)' };
    if (nilaiAkhir <= 70) return { grade: 'Grade 07', hukuman: 'Penurunan Jabatan Setingkat Lebih Rendah selama 12 bulan' };
    if (nilaiAkhir <= 80) return { grade: 'Grade 08', hukuman: 'Pembebasan dari jabatan menjadi jabatan pelaksana selama 12 bulan' };
    return { grade: 'Grade 09', hukuman: 'Pemberhentian dengan hormat tidak atas permintaan sendiri sebagai PNS' };
  }
  