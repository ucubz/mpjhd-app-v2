// utils_v2/hitungNilaiKelompokI.js

export function hitungNilaiKelompokI(jumlahHari, apakahBerturut = false) {
  const hari = parseInt(jumlahHari);
  if (isNaN(hari) || hari <= 0) return 0;

  if (apakahBerturut && hari === 10) return 90; // prioritas untuk 10 hari berturut-turut
  if (hari === 3) return 10;
  if (hari >= 4 && hari <= 6) return 20;
  if (hari >= 7 && hari <= 10) return 30;
  if (hari >= 11 && hari <= 13) return 40;
  if (hari >= 14 && hari <= 16) return 50;
  if (hari >= 17 && hari <= 20) return 60;
  if (hari >= 21 && hari <= 24) return 70;
  if (hari >= 25 && hari <= 27) return 80;
  if (hari === 28) return 90;

  return 0;
}