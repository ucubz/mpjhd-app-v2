// Tes logika MPJHD terhadap 8 contoh resmi PMK 123/2023 (Lampiran II angka 7) dan aturan batas tingkat.
// Tanpa dependensi: `npm test` (atau `node tests/run-pmk-tests.mjs`).
// Kode di src/utils_v2 memakai import tanpa ekstensi (gaya Vite), jadi disalin ke folder
// sementara dengan ekstensi .js ditambahkan supaya bisa dijalankan langsung oleh Node.
import { cpSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = mkdtempSync(join(tmpdir(), 'mpjhd-'));
const dir = join(tmp, 'u2');
cpSync(join(root, 'src/utils_v2'), dir, { recursive: true });
writeFileSync(join(tmp, 'package.json'), '{"type":"module"}');
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js'))) {
  const p = join(dir, f);
  writeFileSync(p, readFileSync(p, 'utf8').replace(/(from\s+'\.\/[^']+?)'/g, (m, a) => (a.endsWith('.js') ? m : `${a}.js'`)));
}
const load = (n) => import(pathToFileURL(join(dir, `${n}.js`)).href);
const { hitungNilaiAkhir } = await load('hitungNilaiAkhir');
const { konversiGrade } = await load('konversiGrade');
const { tentukanNilaiPokok } = await load('tentukanNilaiPokok');
const { tentukanKelompok } = await load('tentukanKelompok');

const base = () => ({
  kelompok: null, pasalUtama: null, dampak: null, jabatan: null, reputasi: null,
  tipeKelompokIII: null, jumlahHariTidakMasuk: '', tipeHariTidakMasuk: '',
  faktorUtama: { peran: null, jumlahKerugian: '' },
  faktorPembobotan: { banyakPasal: '', hukdis: '', kesengajaan: '', hambatan: '', jumlahKerugian: '' },
  faktorMeringankan: { kooperatif: false, inisiator: false },
});
const mk = (o) => {
  const b = base();
  for (const k in o) b[k] = o[k] && typeof o[k] === 'object' ? { ...b[k], ...o[k] } : o[k];
  return b;
};
const nol = { banyakPasal: 'satu', hukdis: 'belumPernah', kesengajaan: 'terpaksa', hambatan: 'tidakAda' };

let gagal = 0;
const cek = (nama, s, nilai, grade) => {
  const r = hitungNilaiAkhir(s);
  const g = konversiGrade(r.nilaiAkhir).grade;
  const ok = r.nilaiAkhir === nilai && g === grade;
  if (!ok) gagal++;
  console.log(`${ok ? 'OK  ' : 'GAGAL'} ${nama.padEnd(58)} diharapkan ${nilai} ${grade} | hasil ${r.nilaiAkhir} ${g}`);
};
const cekSama = (nama, got, exp) => {
  const ok = got === exp;
  if (!ok) gagal++;
  console.log(`${ok ? 'OK  ' : 'GAGAL'} ${nama.padEnd(58)} diharapkan ${exp} | hasil ${got}`);
};

console.log('--- 8 contoh resmi PMK ---');
cek('A  Kel I, 7 hari', mk({ kelompok: 'I', pasalUtama: 'Pasal 4 huruf f', jumlahHariTidakMasuk: 7 }), 30, 'Grade 03');
cek('B  Kel II, 4c, dampak Negara', mk({ kelompok: 'II', pasalUtama: 'Pasal 4 huruf c', dampak: 'Negara',
  faktorPembobotan: { ...nol, kesengajaan: 'sengaja' }, faktorMeringankan: { kooperatif: true } }), 62.5, 'Grade 07');
cek('C  Kel III Umum, 5a', mk({ kelompok: 'III', pasalUtama: 'Pasal 5 huruf a', tipeKelompokIII: 'umum',
  faktorPembobotan: { banyakPasal: 'dua', hukdis: 'belumPernah', kesengajaan: 'sengaja', hambatan: 'menghalangi' } }), 72.5, 'Grade 08');
cek('D  Kel III Individu, 5k, Rp70 juta', mk({ kelompok: 'III', pasalUtama: 'Pasal 5 huruf k', tipeKelompokIII: 'individu',
  faktorUtama: { jumlahKerugian: '50-100' }, faktorPembobotan: { ...nol, kesengajaan: 'sengaja', hambatan: 'menghalangi' } }), 87.5, 'Grade 09');
cek('E  Kel III Bersama, 5k, Aktif, Rp70 juta', mk({ kelompok: 'III', pasalUtama: 'Pasal 5 huruf k', tipeKelompokIII: 'bersama',
  faktorUtama: { peran: 'aktif' }, faktorPembobotan: { jumlahKerugian: '50-100' },
  faktorMeringankan: { kooperatif: true, inisiator: true } }), 72.5, 'Grade 08');
cek('F  Kel IV, 5m, kerugian tidak teridentifikasi', mk({ kelompok: 'IV', pasalUtama: 'Pasal 5 huruf m',
  faktorUtama: { jumlahKerugian: 'tidakTeridentifikasi' }, faktorPembobotan: { ...nol, kesengajaan: 'lalai' },
  faktorMeringankan: { kooperatif: true } }), 33.75, 'Grade 04');
cek('G  Kel V, 4e, Pejabat Fungsional', mk({ kelompok: 'V', pasalUtama: 'Pasal 4 huruf e', jabatan: 'Pejabat Fungsional',
  faktorPembobotan: { ...nol, hukdis: 'pernahSatu', kesengajaan: 'lalai' }, faktorMeringankan: { kooperatif: true } }), 32.5, 'Grade 04');
cek('H  Kel VI, reputasi Unit Kerja', mk({ kelompok: 'VI', pasalUtama: 'terkait Perkawinan/Perceraian', reputasi: 'Unit Kerja',
  faktorPembobotan: { hukdis: 'lebihSatu', hambatan: 'tidakAda' }, faktorMeringankan: { kooperatif: true } }), 75, 'Grade 08');

console.log('\n--- Batas tingkat hukuman ---');
const III = { kelompok: 'III', pasalUtama: 'Pasal 5 huruf a', tipeKelompokIII: 'umum' };
cek('Pokok 60, faktor 0 -> min. Berat', mk({ ...III, faktorPembobotan: nol }), 61, 'Grade 07');
cek('Pokok 60, meringankan 15 -> tetap Berat', mk({ ...III, faktorPembobotan: nol, faktorMeringankan: { kooperatif: true, inisiator: true } }), 61, 'Grade 07');
cek('Pokok 30, faktor 0 -> min. Sedang', mk({ kelompok: 'III', pasalUtama: 'Pasal 4 huruf a', tipeKelompokIII: 'umum', faktorPembobotan: nol }), 31, 'Grade 04');
cek('Pokok 30, meringankan 15 -> tetap Sedang', mk({ kelompok: 'II', pasalUtama: 'Pasal 3 huruf b', dampak: 'Instansi', faktorPembobotan: nol, faktorMeringankan: { kooperatif: true, inisiator: true } }), 31, 'Grade 04');
const maks = { banyakPasal: 'lebihDua', hukdis: 'lebihSatu', kesengajaan: 'sengaja', hambatan: 'menghalangi' };
cek('Pokok 0 + faktor maks. -> maks. Ringan', mk({ kelompok: 'II', pasalUtama: 'Pasal 3 huruf c', dampak: 'Unit Kerja', faktorPembobotan: maks }), 30, 'Grade 03');
cek('Pokok 30 + faktor maks. -> maks. Sedang', mk({ kelompok: 'II', pasalUtama: 'Pasal 3 huruf c', dampak: 'Instansi', faktorPembobotan: maks }), 60, 'Grade 06');

console.log('\n--- Nilai pokok dan kelompok ---');
cekSama('Pasal 4 huruf e, Pejabat Administrator', tentukanNilaiPokok('V', 'Pasal 4 huruf e', '', 'Pejabat Administrator'), 30);
cekSama('Pasal 4 huruf e, Pejabat Pimpinan Tinggi', tentukanNilaiPokok('V', 'Pasal 4 huruf e', '', 'Pejabat Pimpinan Tinggi'), 60);
cekSama('Pasal 5 huruf n angka 2', tentukanNilaiPokok('V', 'Pasal 5 huruf n angka 2'), 30);
for (const n of [3, 4, 5, 6, 7]) cekSama(`Pasal 5 huruf n angka ${n}`, tentukanNilaiPokok('V', `Pasal 5 huruf n angka ${n}`), 60);
cekSama('Pasal 3 huruf g masuk kelompok', tentukanKelompok('Pasal 3 huruf g'), 'II');
cekSama('Pasal 4 huruf i masuk kelompok', tentukanKelompok('Pasal 4 huruf i'), 'III');
cekSama('Pasal 5 huruf n angka 1 tidak dihitung', tentukanKelompok('Pasal 5 huruf n angka 1'), 'Tidak Memiliki Kelompok');

console.log('\n--- Tidak ada kebocoran antar-jalur ---');
const bocor = mk({ kelompok: 'II', pasalUtama: 'Pasal 4 huruf c', dampak: 'Instansi', faktorPembobotan: nol,
  faktorUtama: { peran: 'inisiator', jumlahKerugian: 'gt100' }, reputasi: 'Instansi/Tersangka', tipeKelompokIII: 'bersama' });
cekSama('Kel II mengabaikan sisa faktor utama jalur lain', hitungNilaiAkhir(bocor).nilaiUtama, 0);
cek('Kel I: kurang dari 3 hari ditandai tidak diatur', mk({ kelompok: 'I', pasalUtama: 'Pasal 4 huruf f', jumlahHariTidakMasuk: 2 }), 0, 'Grade 01');
cekSama('  ... dan memberi tanda tidakDiatur', hitungNilaiAkhir(mk({ kelompok: 'I', jumlahHariTidakMasuk: 2 })).tidakDiatur, true);

console.log(gagal ? `\n${gagal} tes GAGAL` : '\nSemua tes lulus');
process.exit(gagal ? 1 : 0);
