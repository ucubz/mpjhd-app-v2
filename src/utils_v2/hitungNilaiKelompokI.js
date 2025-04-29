// utils_v2/hitungNilaiKelompokI.js

export function hitungNilaiKelompokI(jumlahHari) {
    if (jumlahHari === 3) return 10;
    if (jumlahHari >= 4 && jumlahHari <= 6) return 20;
    if (jumlahHari >= 7 && jumlahHari <= 10) return 30;
    if (jumlahHari >= 11 && jumlahHari <= 13) return 40;
    if (jumlahHari >= 14 && jumlahHari <= 16) return 50;
    if (jumlahHari >= 17 && jumlahHari <= 20) return 60;
    if (jumlahHari >= 21 && jumlahHari <= 24) return 70;
    if (jumlahHari >= 25 && jumlahHari <= 27) return 80;
    if (jumlahHari === 28) return 90;
    if (jumlahHari >= 10 && jumlahHari % 10 === 0) return 90; // 10 hari berturut-turut
  
    return 0; // default jika tidak masuk kategori
  }
  