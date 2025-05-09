import { rentangNilaiHukumanDisiplin } from './rentangNilaiHukumanDisiplin';

/**
 * Mengunci nilai akhir dalam rentang hukuman yang diperbolehkan
 * berdasarkan nilai pokok (nilaiAwal).
 *
 * @param {number|string} nilaiAwal - Nilai pokok (penentu rentang)
 * @param {number|string} nilaiHitung - Hasil nilai akhir sebelum dikunci
 * @returns {number} Nilai akhir yang telah dikunci dalam rentang
 */
export function kunciNilaiDalamRentang(nilaiAwal, nilaiHitung) {
  nilaiAwal = Number(nilaiAwal);
  nilaiHitung = Number(nilaiHitung);

  const range = rentangNilaiHukumanDisiplin.find(
    (r) => nilaiAwal >= r.min && nilaiAwal <= r.max
  );

  console.log('== [kunciNilaiDalamRentang] Debug ==');
  console.log('nilaiAwal (pokok):', nilaiAwal);
  console.log('nilaiHitung (sebelum dikunci):', nilaiHitung);
  console.log('Rentang ditemukan:', range);

  if (!range) {
    console.warn('⚠️ Tidak ada rentang cocok dengan nilaiAwal. Nilai tidak dikunci.');
    return nilaiHitung;
  }

  if (nilaiHitung < range.min) {
    console.log(`Nilai terlalu kecil, dikunci ke batas bawah ${range.min}`);
    return range.min;
  }

  if (nilaiHitung > range.max) {
    console.log(`Nilai terlalu besar, dikunci ke batas atas ${range.max}`);
    return range.max;
  }

  return nilaiHitung;
}
