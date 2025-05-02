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
export function hitungNilaiAkhirLengkap(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();

  // Kelompok I: khusus, hanya pakai jumlah hari
  if (kelompok === 'I') {
    const jumlahHari = state.jumlahHariTidakMasuk || 0;
    const nilaiPokok = hitungNilaiKelompokI(jumlahHari);
    return {
      nilaiPokok,
      nilaiTambahan: 0,
      pengurangMeringankan: 0,
      nilaiAkhir: nilaiPokok, // langsung gunakan sebagai nilai akhir
    };
  }

  // Kelompok lain: hitung semua komponen
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