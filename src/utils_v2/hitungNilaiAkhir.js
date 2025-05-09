import { hitungNilaiKelompokI } from './hitungNilaiKelompokI';
import { tentukanNilaiPokok } from './tentukanNilaiPokok';
import { hitungFaktorTambahan } from './hitungFaktorTambahan';
import { hitungFaktorMeringankan } from './hitungFaktorMeringankan';
import { kunciNilaiDalamRentang } from './kunciNilaiDalamRentang';

// Pemetaan nilai peran (khusus Kelompok III bersama)
const peranMap = {
  pasif: 5,
  aktif: 10,
  inisiator: 15,
};

/**
 * Menghitung nilai akhir MPJHD berdasarkan seluruh state.
 * Rumus: Nilai Pokok + Faktor Utama + Faktor Tambahan - Meringankan
 *
 * @param {object} state - Seluruh state dari context MPJHD
 * @returns {object} hasil: { nilaiPokok, nilaiUtama, nilaiTambahan, pengurangMeringankan, nilaiSebelumKunci, nilaiAkhir }
 */
export function hitungNilaiAkhir(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();
  const tipeKelompokIII = state.tipeKelompokIII || '';

  // ======= Kelompok I (khusus absen) =======
  if (kelompok === 'I') {
    const apakahBerturut = state.tipeHariTidakMasuk === 'berturut';
    const nilaiPokok = Number(hitungNilaiKelompokI(state.jumlahHariTidakMasuk || 0, apakahBerturut)) || 0;
    const nilaiUtama = 0;
    const nilaiTambahan = 0;
    const pengurangMeringankan = 0;
    const nilaiSebelumKunci = nilaiPokok;
    const nilaiAkhir = kunciNilaiDalamRentang(nilaiPokok, nilaiSebelumKunci);

    console.log('[DEBUG] Kelompok I');
    console.log('[DEBUG] jumlahHariTidakMasuk:', state.jumlahHariTidakMasuk);
    console.log('[DEBUG] tipeHariTidakMasuk:', state.tipeHariTidakMasuk);
    console.log('[DEBUG] nilaiPokok:', nilaiPokok);
    console.log('[DEBUG] nilaiAkhir:', nilaiAkhir);

    return {
      nilaiPokok,
      nilaiUtama,
      nilaiTambahan,
      pengurangMeringankan,
      nilaiSebelumKunci,
      nilaiAkhir,
    };
  }

  // ======= Kelompok lainnya =======
  const nilaiPokok = Number(
    tentukanNilaiPokok(
      state.kelompok,
      state.pasalUtama,
      state.dampak,
      state.jabatan
    )
  ) || 0;

  let nilaiUtama = 0;
  let nilaiTambahan = 0;

  if (kelompok === 'III' && tipeKelompokIII === 'bersama') {
    const peranStr = String(state.faktorUtama?.peran || '').toLowerCase();
    nilaiUtama = peranMap[peranStr] || 0;
    nilaiTambahan = Number(state.faktorUtama?.jumlahKerugian) || 0;
  } else {
    nilaiUtama = Number(state.faktorUtama?.nilai) || 0;
    nilaiTambahan = Number(hitungFaktorTambahan(state.faktorPembobotan, kelompok === 'III' ? `III_${tipeKelompokIII?.toUpperCase()}` : kelompok)) || 0;
  }

  const pengurangMeringankan = Number(
    hitungFaktorMeringankan(
      state.faktorMeringankan?.kooperatif,
      state.faktorMeringankan?.inisiator
    )
  ) || 0;

  const nilaiSebelumKunci = nilaiPokok + nilaiUtama + nilaiTambahan - pengurangMeringankan;
  const nilaiAkhir = kunciNilaiDalamRentang(nilaiPokok, nilaiSebelumKunci);

  // === DEBUG OUTPUT ===
  console.log('== [kunciNilaiDalamRentang] Debug ==');
  console.log('nilaiAwal (pokok):', nilaiPokok);
  console.log('nilaiHitung (sebelum dikunci):', nilaiSebelumKunci);
  console.log('Rentang ditemukan:', kunciNilaiDalamRentang(nilaiPokok, nilaiSebelumKunci, true)); // jika fungsi mendukung debug

  console.log('[DEBUG] Kelompok:', kelompok);
  console.log('[DEBUG] tipeKelompokIII:', tipeKelompokIII);
  console.log('[DEBUG] nilaiPokok:', nilaiPokok);
  console.log('[DEBUG] nilaiUtama:', nilaiUtama);
  console.log('[DEBUG] nilaiTambahan:', nilaiTambahan);
  console.log('[DEBUG] pengurangMeringankan:', pengurangMeringankan);
  console.log('[DEBUG] nilaiSebelumKunci:', nilaiSebelumKunci);
  console.log('[DEBUG] nilaiAkhir (terkunci):', nilaiAkhir);

  return {
    nilaiPokok,
    nilaiUtama,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiSebelumKunci,
    nilaiAkhir,
  };
}
