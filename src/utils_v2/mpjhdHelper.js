// utils_v2/mpjhdHelper.js

// Fungsi untuk memformat angka dengan pemisah ribuan
export function formatAngka(angka) {
    return angka.toLocaleString('id-ID');
  }
  
  // Fungsi untuk memastikan input adalah angka positif
  export function cekInputPositif(input) {
    return !isNaN(input) && input > 0;
  }
  
  // Fungsi untuk menghitung total dari array angka
  export function hitungTotal(angkaArray) {
    return angkaArray.reduce((total, angka) => total + angka, 0);
  }
  