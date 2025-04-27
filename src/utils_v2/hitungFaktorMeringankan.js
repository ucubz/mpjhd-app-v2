// utils_v2/hitungFaktorMeringankan.js

export function hitungFaktorMeringankan(kooperatif, inisiator) {
    let meringankan = 0;
  
    if (kooperatif) meringankan += 5;
    if (inisiator) meringankan += 10;
  
    return meringankan;
  }
  