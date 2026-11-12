// utils_v2/opsiFaktor.js
// Sumber tunggal opsi & nilai Faktor Pembobotan Utama (PMK 123/2023, Lampiran II).
// UI (Step 3-5) dan perhitungan (hitungNilaiAkhir) sama-sama memakai berkas ini,
// supaya angka di layar tidak bisa berbeda dari angka yang dihitung.

// ---- Kelompok III Khusus (individu & bersama-sama): jumlah uang / kerugian ----
export const KERUGIAN_OPTIONS = [
  { value: 'le10', label: 'Sampai dengan Rp10 juta' },
  { value: '10-50', label: 'Lebih dari Rp10 juta s.d. Rp50 juta' },
  { value: '50-100', label: 'Lebih dari Rp50 juta s.d. Rp100 juta' },
  { value: 'gt100', label: 'Lebih dari Rp100 juta' },
];

// III Khusus, dilakukan secara individu -> Faktor Utama
export const NILAI_KERUGIAN_INDIVIDU = { le10: 7.5, '10-50': 15, '50-100': 22.5, gt100: 30 };

// III Khusus, dilakukan bersama-sama -> Faktor Pembobotan Tambahan
export const NILAI_KERUGIAN_BERSAMA = { le10: 2.5, '10-50': 5, '50-100': 7.5, gt100: 10 };

// ---- Kelompok III Khusus bersama-sama: peran ----
export const PERAN_OPTIONS = [
  { value: 'pasif', label: 'Pasif' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'inisiator', label: 'Inisiator' },
];
export const NILAI_PERAN = { pasif: 10, aktif: 20, inisiator: 30 };

// ---- Kelompok IV: kerugian bagi pihak yang dilayani ----
export const KERUGIAN_IV_OPTIONS = [
  { value: 'tidakTeridentifikasi', label: 'Kerugian tidak dapat diidentifikasi' },
  { value: 'le50', label: 'Kerugian sampai dengan Rp50 juta' },
  { value: 'gt50', label: 'Kerugian lebih dari Rp50 juta' },
];
export const NILAI_KERUGIAN_IV = { tidakTeridentifikasi: 7.5, le50: 15, gt50: 22.5 };

// ---- Kelompok VI: dampak terhadap reputasi / pelaksanaan tugas ----
export const REPUTASI_OPTIONS = ['Tidak Berdampak', 'Unit Kerja', 'Instansi/Tersangka'];
export const NILAI_REPUTASI = { 'Tidak Berdampak': 0, 'Unit Kerja': 15, 'Instansi/Tersangka': 30 };

/**
 * Faktor Pembobotan Utama untuk state saat ini.
 * Hanya membaca field milik kelompok yang sedang aktif, sehingga sisa
 * pilihan dari jalur lain tidak ikut terhitung.
 */
export function hitungFaktorUtama(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();
  const tipe = state.tipeKelompokIII || '';
  const fu = state.faktorUtama || {};

  if (kelompok === 'III' && tipe === 'bersama') return NILAI_PERAN[fu.peran] ?? 0;
  if (kelompok === 'III' && tipe === 'individu') return NILAI_KERUGIAN_INDIVIDU[fu.jumlahKerugian] ?? 0;
  if (kelompok === 'IV') return NILAI_KERUGIAN_IV[fu.jumlahKerugian] ?? 0;
  if (kelompok === 'VI') return NILAI_REPUTASI[state.reputasi] ?? 0;
  return 0;
}
