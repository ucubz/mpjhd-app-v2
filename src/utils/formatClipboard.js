// src/utils/mpjhdHelper.js atau src/utils/formatClipboard.js

export function formatClipboard(state) {
    return `
  Ringkasan Hasil Perhitungan MPJHD
  
  Kategori Pelanggaran: ${state.kategori || '-'}
  Pasal Utama: ${state.pasalUtama || '-'}
  Kelompok: ${state.kelompok || '-'}
  Dampak: ${state.dampak || '-'}
  Nilai Pokok: ${state.nilaiPokok ?? '-'}
  Nilai Akhir: ${state.nilaiAkhir ?? '-'}
  Grade Hukuman: ${state.grade || '-'}
  Jenis Hukuman Disiplin: ${state.jenisHukuman || '-'}
  
  -- Disalin dari Aplikasi MPJHD --
  `.trim();
  }
  