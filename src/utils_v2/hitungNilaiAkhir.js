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

    console.log('[DEBUG] Kelompok I');
    console.log('[DEBUG] jumlahHariTidakMasuk:', jumlahHari);
    console.log('[DEBUG] nilaiPokok:', nilaiPokok);

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

  console.log('[DEBUG] Kelompok:', kelompok);
  console.log('[DEBUG] pasal:', state.pasalUtama);
  console.log('[DEBUG] dampak:', state.dampak);
  console.log('[DEBUG] jabatan:', state.jabatan);
  console.log('[DEBUG] faktorPembobotan:', state.faktorPembobotan);
  console.log('[DEBUG] faktorMeringankan:', state.faktorMeringankan);
  console.log('[DEBUG] nilaiPokok:', nilaiPokok);
  console.log('[DEBUG] nilaiTambahan:', nilaiTambahan);
  console.log('[DEBUG] pengurangMeringankan:', pengurangMeringankan);
  console.log('[DEBUG] nilaiAkhir:', nilaiAkhir);

  return {
    nilaiPokok,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiAkhir,
  };
}