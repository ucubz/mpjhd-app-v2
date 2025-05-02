// utils_v2/hitungNilaiAkhir.js

import { hitungNilaiKelompokI } from './hitungNilaiKelompokI';
import { tentukanNilaiPokok } from './tentukanNilaiPokok';
import { hitungFaktorTambahan } from './hitungFaktorTambahan';
import { hitungFaktorMeringankan } from './hitungFaktorMeringankan';

/**
 * Menghitung nilai akhir MPJHD berdasarkan seluruh state.
 * Untuk Kelompok I, hanya menggunakan jumlah hari.
 * Untuk kelompok lain, menghitung dari: pokok + tambahan - meringankan.
 *
 * @param {object} state - Seluruh state dari context MPJHD
 * @returns {object} hasil: { nilaiPokok, nilaiTambahan, pengurangMeringankan, nilaiAkhir }
 */
export function hitungNilaiAkhir(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();

  if (kelompok === 'I') {
    const jumlahHari = state.jumlahHariTidakMasuk || 0;
    const nilaiPokok = hitungNilaiKelompokI(jumlahHari);
    return {
      nilaiPokok,
      nilaiTambahan: 0,
      pengurangMeringankan: 0,
      nilaiAkhir: nilaiPokok,
    };
  }

  const nilaiPokok = tentukanNilaiPokok(
    state.kelompok,
    state.pasalUtama,
    state.dampak,
    state.jabatan
  );

  const nilaiTambahan = hitungFaktorTambahan(state.faktorPembobotan, kelompok);
  const pengurangMeringankan = hitungFaktorMeringankan(state.faktorMeringankan);

  const nilaiAkhir = nilaiPokok + nilaiTambahan - pengurangMeringankan;

  return {
    nilaiPokok,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiAkhir,
  };
}