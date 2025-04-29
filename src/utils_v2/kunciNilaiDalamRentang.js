// utils_v2/kunciNilaiDalamRentang.js

import { rentangNilaiHukumanDisiplin } from './rentangNilaiHukumanDisiplin';

export function kunciNilaiDalamRentang(nilaiAwal, nilaiHitung) {
  const range = rentangNilaiHukumanDisiplin.find(r => nilaiAwal >= r.min && nilaiAwal <= r.max);
  if (!range) return nilaiHitung; // fallback kalau error
  
  if (nilaiHitung < range.min) return range.min;
  if (nilaiHitung > range.max) return range.max;
  
  return nilaiHitung;
}
