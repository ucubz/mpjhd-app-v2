// utils_v2/hitungFaktorTambahan.js

/**
 * Menghitung total faktor tambahan berdasarkan kelompok dan pilihan faktor.
 * @param {Object} data - Data pilihan faktor (banyakPasal, hukdis, kesengajaan, hambatan).
 * @param {string} kelompok - Kelompok perhitungan ('II', 'III_UMUM', 'III_INDIVIDU', 'IV', 'V', 'VI').
 * @returns {number} Total nilai faktor tambahan.
 */
export function hitungFaktorTambahan(data, kelompok) {
  const nilaiMap = {
      II: { dua: 3.75, lebihDua: 7.5, pernahSatu: 3.75, lebihSatu: 7.5, lalai: 3.75, sengaja: 7.5, tidakKooperatif: 3.75, menghalangi: 7.5 },
      III_UMUM: { dua: 2.5, lebihDua: 5, pernahSatu: 15, lalai: 2.5, sengaja: 5, tidakKooperatif: 2.5, menghalangi: 5 },
      III_INDIVIDU: { dua: 1.25, lebihDua: 2.5, pernahSatu: 1.25, lebihSatu: 2.5, lalai: 1.25, sengaja: 2.5, tidakKooperatif: 1.25, menghalangi: 2.5 },
      IV: { dua: 1.25, lebihDua: 2.5, pernahSatu: 1.25, lebihSatu: 2.5, lalai: 1.25, sengaja: 2.5, tidakKooperatif: 1.25, menghalangi: 2.5 },
      V: { dua: 3.75, lebihDua: 7.5, pernahSatu: 3.75, lebihSatu: 7.5, lalai: 3.75, sengaja: 7.5, tidakKooperatif: 3.75, menghalangi: 7.5 },
      VI: { pernahSatu: 2.5, lebihSatu: 5, tidakKooperatif: 2.5, menghalangi: 5 },
  };

  const map = nilaiMap[kelompok];
  if (!map) return 0;

  let tambahan = 0;

  // Banyak pasal
  if (data.banyakPasal === 'dua') tambahan += map.dua || 0;
  else if (data.banyakPasal === 'lebihDua') tambahan += map.lebihDua || 0;

  // Riwayat hukuman disiplin
  if (data.hukdis === 'pernahSatu') tambahan += map.pernahSatu || 0;
  else if (data.hukdis === 'lebihSatu') tambahan += map.lebihSatu || 0;

  // Kesengajaan
  if (data.kesengajaan === 'lalai') tambahan += map.lalai || 0;
  else if (data.kesengajaan === 'sengaja') tambahan += map.sengaja || 0;

  // Hambatan pemeriksaan
  if (data.hambatan === 'tidakKooperatif') tambahan += map.tidakKooperatif || 0;
  else if (data.hambatan === 'menghalangi') tambahan += map.menghalangi || 0;

  return tambahan;
}