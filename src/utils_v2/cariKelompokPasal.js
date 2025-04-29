// utils_v2/cariKelompokPasal.js

import { pengelompokanPasal } from './pengelompokanPasal';

export function cariKelompokPasal(pasal) {
  for (const entry of pengelompokanPasal) {
    if (entry.pasal.some(p => pasal.includes(p))) {
      return entry.kelompok;
    }
  }
  return 'Tidak Memiliki Kelompok';
}
