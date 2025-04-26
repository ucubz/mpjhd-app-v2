// src/utils/hitungFaktorMeringankan.js

// Fungsi menghitung total faktor pembobotan yang meringankan
export function hitungFaktorMeringankan(mringankanState) {
    if (!mringankanState) return 0;
  
    let total = 0;
  
    // Berperilaku baik/kooperatif selama proses pemeriksaan
    if (mringankanState.kooperatif) total += 5;
  
    // Inisiator pengungkapan pelanggaran signifikan
    if (mringankanState.inisiator) total += 10;
  
    return total;
  }
  