// utils_v2/hitungNilaiAkhir.js

export function hitungNilaiAkhir(nilaiPokok, faktorUtama = 0, faktorTambahan = 0, faktorMeringankan = 0) {
    return nilaiPokok + faktorUtama + faktorTambahan - faktorMeringankan;
  }
  