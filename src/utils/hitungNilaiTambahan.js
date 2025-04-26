// src/utils/hitungNilaiTambahan.js

// Fungsi menghitung faktor pembobotan tambahan berdasarkan kelompok
export function hitungFaktorTambahanII(faktor) {
    let total = 0;
    if (faktor.banyakPasal === 'dua') total += 3.75;
    if (faktor.banyakPasal === 'lebihDariDua') total += 7.5;
  
    if (faktor.hukdis === 'pernahSatuKali') total += 3.75;
    if (faktor.hukdis === 'lebihDariSatu') total += 7.5;
  
    if (faktor.kesengajaan === 'tidakSengaja') total += 3.75;
    if (faktor.kesengajaan === 'sengaja') total += 7.5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 3.75;
    if (faktor.hambatan === 'menghalangi') total += 7.5;
  
    return total;
  }
  
  export function hitungFaktorTambahanIIIUmum(faktor) {
    let total = 0;
    if (faktor.banyakPasal === 'dua') total += 2.5;
    if (faktor.banyakPasal === 'lebihDariDua') total += 5;
  
    if (faktor.hukdis === 'pernahSatuKali') total += 15;
  
    if (faktor.kesengajaan === 'tidakSengaja') total += 2.5;
    if (faktor.kesengajaan === 'sengaja') total += 5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 2.5;
    if (faktor.hambatan === 'menghalangi') total += 5;
  
    return total;
  }
  
  export function hitungFaktorTambahanIIIKhususIndividual(faktor) {
    let total = 0;
    if (faktor.banyakPasal === 'dua') total += 1.25;
    if (faktor.banyakPasal === 'lebihDariDua') total += 2.5;
  
    if (faktor.hukdis === 'pernahSatuKali') total += 1.25;
    if (faktor.hukdis === 'lebihDariSatu') total += 2.5;
  
    if (faktor.kesengajaan === 'tidakSengaja') total += 1.25;
    if (faktor.kesengajaan === 'sengaja') total += 2.5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 1.25;
    if (faktor.hambatan === 'menghalangi') total += 2.5;
  
    return total;
  }
  
  export function hitungFaktorTambahanIV(faktor) {
    let total = 0;
    if (faktor.banyakPasal === 'dua') total += 1.25;
    if (faktor.banyakPasal === 'lebihDariDua') total += 2.5;
  
    if (faktor.hukdis === 'pernahSatuKali') total += 1.25;
    if (faktor.hukdis === 'lebihDariSatu') total += 2.5;
  
    if (faktor.kesengajaan === 'tidakSengaja') total += 1.25;
    if (faktor.kesengajaan === 'sengaja') total += 2.5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 1.25;
    if (faktor.hambatan === 'menghalangi') total += 2.5;
  
    return total;
  }
  
  export function hitungFaktorTambahanV(faktor) {
    let total = 0;
    if (faktor.banyakPasal === 'dua') total += 3.75;
    if (faktor.banyakPasal === 'lebihDariDua') total += 7.5;
  
    if (faktor.hukdis === 'pernahSatuKali') total += 3.75;
    if (faktor.hukdis === 'lebihDariSatu') total += 7.5;
  
    if (faktor.kesengajaan === 'tidakSengaja') total += 3.75;
    if (faktor.kesengajaan === 'sengaja') total += 7.5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 3.75;
    if (faktor.hambatan === 'menghalangi') total += 7.5;
  
    return total;
  }
  
  export function hitungFaktorTambahanVI(faktor) {
    let total = 0;
    if (faktor.hukdis === 'pernahSatuKali') total += 2.5;
    if (faktor.hukdis === 'lebihDariSatu') total += 5;
  
    if (faktor.hambatan === 'tidakKooperatif') total += 2.5;
    if (faktor.hambatan === 'menghalangi') total += 5;
  
    return total;
  }
  