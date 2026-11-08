import { NILAI_KERUGIAN_BERSAMA } from './opsiFaktor';

/**
 * Map nilai pembobotan tambahan berdasarkan kelompok dan jenis faktor.
 */
export const nilaiMap = {
  II: {
    satu: 0,
    dua: 3.75,
    lebihDua: 7.5,
    belumPernah: 0,
    pernahSatu: 3.75,
    lebihSatu: 7.5,
    terpaksa: 0,
    lalai: 3.75,
    sengaja: 7.5,
    tidakAda: 0,
    tidakKooperatif: 3.75,
    menghalangi: 7.5,
  },
  III_UMUM: {
    satu: 0,
    dua: 2.5,
    lebihDua: 5,
    belumPernah: 0,
    pernahSatu: 15,
    // TODO(keputusan): opsi "lebih dari satu kali" dihapus untuk III Umum (nilai di PMK tidak jelas)
    terpaksa: 0,
    lalai: 2.5,
    sengaja: 5,
    tidakAda: 0,
    tidakKooperatif: 2.5,
    menghalangi: 5,
  },
  III_INDIVIDU: {
    satu: 0,
    dua: 1.25,
    lebihDua: 2.5,
    belumPernah: 0,
    pernahSatu: 1.25,
    lebihSatu: 2.5,
    terpaksa: 0,
    lalai: 1.25,
    sengaja: 2.5,
    tidakAda: 0,
    tidakKooperatif: 1.25,
    menghalangi: 2.5,
  },
  // III Bersama: tidak memakai empat faktor; tambahannya hanya jumlah uang/kerugian
  // (lihat NILAI_KERUGIAN_BERSAMA di opsiFaktor.js)
  IV: {
    satu: 0,
    dua: 1.25,
    lebihDua: 2.5,
    belumPernah: 0,
    pernahSatu: 1.25,
    lebihSatu: 2.5,
    terpaksa: 0,
    lalai: 1.25,
    sengaja: 2.5,
    tidakAda: 0,
    tidakKooperatif: 1.25,
    menghalangi: 2.5,
  },
  V: {
    satu: 0,
    dua: 3.75,
    lebihDua: 7.5,
    belumPernah: 0,
    pernahSatu: 3.75,
    lebihSatu: 7.5,
    terpaksa: 0,
    lalai: 3.75,
    sengaja: 7.5,
    tidakAda: 0,
    tidakKooperatif: 3.75,
    menghalangi: 7.5,
  },
  VI: {
    belumPernah: 0,
    pernahSatu: 2.5,
    lebihSatu: 5,
    tidakAda: 0,
    tidakKooperatif: 2.5,
    menghalangi: 5,
  },
};

/** Faktor mana saja yang ditanyakan/dihitung untuk kelompok aktif. */
export function faktorYangDipakai(kelompok) {
  if (kelompok === 'III_BERSAMA') return [];
  if (kelompok === 'VI') return ['hukdis', 'hambatan'];
  return ['banyakPasal', 'hukdis', 'kesengajaan', 'hambatan'];
}

/**
 * Menghitung total faktor tambahan berdasarkan kelompok dan pilihan faktor.
 * @param {Object} data - Data pilihan faktor (banyakPasal, hukdis, kesengajaan, hambatan).
 * @param {string} kelompok - Kelompok perhitungan ('II', 'III_UMUM', 'III_INDIVIDU', 'III_BERSAMA', 'IV', 'V', 'VI').
 * @returns {number} Total nilai faktor tambahan.
 */
export function hitungFaktorTambahan(data, kelompok) {
  if (kelompok === 'III_BERSAMA') return NILAI_KERUGIAN_BERSAMA[data?.jumlahKerugian] ?? 0;
  const map = nilaiMap[kelompok];
  if (!map) return 0;
  return faktorYangDipakai(kelompok).reduce((total, f) => total + (map[data?.[f]] ?? 0), 0);
}

/**
 * Menghitung rincian nilai faktor tambahan per faktor.
 * Cocok untuk debug di Step7 (hanya untuk Kelompok III umum/individu).
 * 
 * @param {Object} data - Data pilihan faktor
 * @param {string} kelompok - Misal: 'III_UMUM' atau 'III_INDIVIDU'
 * @returns {Object} Rincian nilai per faktor
 */
export function hitungFaktorTambahanRinci(data, kelompok) {
  if (kelompok === 'III_BERSAMA') {
    return { jumlahKerugian: NILAI_KERUGIAN_BERSAMA[data?.jumlahKerugian] ?? 0 };
  }
  const map = nilaiMap[kelompok] || {};
  if (kelompok === 'VI') {
    return { hukdis: map[data.hukdis] ?? 0, hambatan: map[data.hambatan] ?? 0 };
  }

  return {
    banyakPasal: map[data.banyakPasal] ?? 0,
    hukdis: map[data.hukdis] ?? 0,
    kesengajaan: map[data.kesengajaan] ?? 0,
    hambatan: map[data.hambatan] ?? 0,
  };
}

/**
 * Mengembalikan opsi yang tersedia dalam baseOptions berdasarkan nilaiMap untuk kelompok tertentu.
 * 
 * @param {Array} baseOptions - Array opsi (dengan .value)
 * @param {string} kelompokKey - Contoh: 'II', 'III_UMUM', dll.
 * @returns {Array} opsi yang sesuai nilaiMap kelompok
 */
export function getAvailableOptions(baseOptions, kelompokKey) {
  const map = nilaiMap[kelompokKey] || {};
  return baseOptions.filter((opt) => opt.value in map);
}
