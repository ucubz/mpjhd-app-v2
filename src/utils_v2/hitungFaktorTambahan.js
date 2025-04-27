// utils_v2/hitungFaktorTambahan.js

export function hitungFaktorTambahanKelompokII(banyakPasal, hukdis, kesengajaan, hambatan) {
    let tambahan = 0;
  
    // Banyak pasal
    if (banyakPasal === 'dua') tambahan += 3.75;
    else if (banyakPasal === 'lebihDua') tambahan += 7.5;
  
    // Riwayat hukdis
    if (hukdis === 'pernahSatu') tambahan += 3.75;
    else if (hukdis === 'lebihSatu') tambahan += 7.5;
  
    // Kesengajaan
    if (kesengajaan === 'lalai') tambahan += 3.75;
    else if (kesengajaan === 'sengaja') tambahan += 7.5;
  
    // Hambatan pemeriksaan
    if (hambatan === 'tidakKooperatif') tambahan += 3.75;
    else if (hambatan === 'menghalangi') tambahan += 7.5;
  
    return tambahan;
  }
  
  export function hitungFaktorTambahanKelompokIIIUmum(banyakPasal, hukdis, kesengajaan, hambatan) {
    let tambahan = 0;
  
    if (banyakPasal === 'dua') tambahan += 2.5;
    else if (banyakPasal === 'lebihDua') tambahan += 5;
  
    if (hukdis === 'pernahSatu') tambahan += 15;
  
    if (kesengajaan === 'lalai') tambahan += 2.5;
    else if (kesengajaan === 'sengaja') tambahan += 5;
  
    if (hambatan === 'tidakKooperatif') tambahan += 2.5;
    else if (hambatan === 'menghalangi') tambahan += 5;
  
    return tambahan;
  }
  
  export function hitungFaktorTambahanKelompokIIIIndividu(banyakPasal, hukdis, kesengajaan, hambatan) {
    let tambahan = 0;
  
    if (banyakPasal === 'dua') tambahan += 1.25;
    else if (banyakPasal === 'lebihDua') tambahan += 2.5;
  
    if (hukdis === 'pernahSatu') tambahan += 1.25;
    else if (hukdis === 'lebihSatu') tambahan += 2.5;
  
    if (kesengajaan === 'lalai') tambahan += 1.25;
    else if (kesengajaan === 'sengaja') tambahan += 2.5;
  
    if (hambatan === 'tidakKooperatif') tambahan += 1.25;
    else if (hambatan === 'menghalangi') tambahan += 2.5;
  
    return tambahan;
  }
  
  export function hitungFaktorTambahanKelompokIV(banyakPasal, hukdis, kesengajaan, hambatan) {
    let tambahan = 0;
  
    if (banyakPasal === 'dua') tambahan += 1.25;
    else if (banyakPasal === 'lebihDua') tambahan += 2.5;
  
    if (hukdis === 'pernahSatu') tambahan += 1.25;
    else if (hukdis === 'lebihSatu') tambahan += 2.5;
  
    if (kesengajaan === 'lalai') tambahan += 1.25;
    else if (kesengajaan === 'sengaja') tambahan += 2.5;
  
    if (hambatan === 'tidakKooperatif') tambahan += 1.25;
    else if (hambatan === 'menghalangi') tambahan += 2.5;
  
    return tambahan;
  }
  
  export function hitungFaktorTambahanKelompokV(banyakPasal, hukdis, kesengajaan, hambatan) {
    let tambahan = 0;
  
    if (banyakPasal === 'dua') tambahan += 3.75;
    else if (banyakPasal === 'lebihDua') tambahan += 7.5;
  
    if (hukdis === 'pernahSatu') tambahan += 3.75;
    else if (hukdis === 'lebihSatu') tambahan += 7.5;
  
    if (kesengajaan === 'lalai') tambahan += 3.75;
    else if (kesengajaan === 'sengaja') tambahan += 7.5;
  
    if (hambatan === 'tidakKooperatif') tambahan += 3.75;
    else if (hambatan === 'menghalangi') tambahan += 7.5;
  
    return tambahan;
  }
  
  export function hitungFaktorTambahanKelompokVI(hukdis, hambatan) {
    let tambahan = 0;
  
    if (hukdis === 'pernahSatu') tambahan += 2.5;
    else if (hukdis === 'lebihSatu') tambahan += 5;
  
    if (hambatan === 'tidakKooperatif') tambahan += 2.5;
    else if (hambatan === 'menghalangi') tambahan += 5;
  
    return tambahan;
  }
  