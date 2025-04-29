// utils_v2/rentangNilaiHukumanDisiplin.js

export const rentangNilaiHukumanDisiplin = [
    {
      tingkat: 'Ringan',
      min: 0,
      max: 30,
      nilaiPokok: 0,
    },
    {
      tingkat: 'Sedang',
      min: 30,
      max: 60,
      nilaiPokok: 30,
    },
    {
      tingkat: 'Berat',
      min: 60,
      max: 100, // Kita set max 100 untuk batas aman, menyesuaikan konversi grade
      nilaiPokok: 60,
    },
  ];
  