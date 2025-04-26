// utils/mpjhdHelper.js

// Konversi nilai akhir ke grade hukuman dan jenis hukuman sesuai tabel MPJHD
export function konversiGrade(nilai) {
  if (nilai > 0 && nilai <= 10) return { grade: 'Grade 01', hukuman: 'Teguran Lisan' }
  if (nilai > 10 && nilai <= 20) return { grade: 'Grade 02', hukuman: 'Teguran Tertulis' }
  if (nilai > 20 && nilai <= 30) return { grade: 'Grade 03', hukuman: 'Pernyataan tidak puas secara tertulis' }
  if (nilai > 30 && nilai <= 40) return { grade: 'Grade 04', hukuman: 'Potongan Tunjangan 25% selama 6 bulan' }
  if (nilai > 40 && nilai <= 50) return { grade: 'Grade 05', hukuman: 'Potongan Tunjangan 25% selama 9 bulan' }
  if (nilai > 50 && nilai <= 60) return { grade: 'Grade 06', hukuman: 'Potongan Tunjangan 25% selama 12 bulan' }
  if (nilai > 60 && nilai <= 70) return { grade: 'Grade 07', hukuman: 'Penurunan Jabatan setingkat lebih rendah selama 12 bulan' }
  if (nilai > 70 && nilai <= 80) return { grade: 'Grade 08', hukuman: 'Pembebasan dari jabatan ke pelaksana selama 12 bulan' }
  if (nilai > 80) return { grade: 'Grade 09', hukuman: 'Pemberhentian dengan hormat tidak atas permintaan sendiri sebagai PNS' }
  return { grade: '-', hukuman: '-' }
}

// Menentukan Nilai Pokok Awal berdasarkan pasal, kelompok, dampak, jabatan
export function determineNilaiPokok(pasalUtama, kelompok, dampak = '', jenisJabatan = '') {
  if (kelompok === 'I') {
    return 0; // Khusus kelompok I, dihitung di input jumlah hari
  }
  if (kelompok === 'II') {
    if (pasalUtama === 'Pasal 3 huruf a') return 60;
    if (pasalUtama === 'Pasal 3 huruf b') return 30;
    if (['Pasal 3 huruf c', 'Pasal 3 huruf d', 'Pasal 3 huruf e', 'Pasal 3 huruf f', 'Pasal 4 huruf c', 'Pasal 4 huruf d', 'Pasal 4 huruf g', 'Pasal 4 huruf h', 'Pasal 5 huruf f', 'Pasal 5 huruf g', 'Pasal 5 huruf h', 'Pasal 5 huruf i', 'Pasal 5 huruf j'].includes(pasalUtama)) {
      if (dampak === 'Unit Kerja') return 0;
      if (dampak === 'Instansi') return 30;
      if (dampak === 'Negara') return 60;
    }
  }
  if (kelompok === 'III') {
    if (['Pasal 4 huruf a', 'Pasal 4 huruf b'].includes(pasalUtama)) return 30;
    if (['Pasal 5 huruf a', 'Pasal 5 huruf b', 'Pasal 5 huruf c', 'Pasal 5 huruf d', 'Pasal 5 huruf e', 'Pasal 5 huruf k', 'Pasal 5 huruf l'].includes(pasalUtama)) return 60;
  }
  if (kelompok === 'IV') {
    return 30;
  }
  if (kelompok === 'V') {
    if (pasalUtama === 'Pasal 4 huruf e') {
      if (jenisJabatan === 'Pejabat Administrator' || jenisJabatan === 'Pejabat Fungsional') return 30;
      if (jenisJabatan === 'Pejabat Pimpinan Tinggi' || jenisJabatan === 'Pejabat Lainnya') return 60;
    }
    if (pasalUtama === 'Pasal 5 angka 2') return 30;
    if (['Pasal 5 angka 3', 'Pasal 5 angka 4', 'Pasal 5 angka 5', 'Pasal 5 angka 6', 'Pasal 5 angka 7'].includes(pasalUtama)) return 60;
  }
  if (kelompok === 'VI') {
    return 60;
  }
  return 0; // Default
}

// Format hasil tabel menjadi teks untuk clipboard
export function formatClipboard(state) {
  const pembobotan = Object.entries(state.pembobotan || {})
    .filter(([_, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'Tidak ada'
  const meringankan = Object.entries(state.meringankan || {})
    .filter(([_, v]) => v)
    .map(([k]) => k)
    .join(', ') || 'Tidak ada'

  return `
Kategori Pelanggaran : ${state.kategori}
Pasal Utama          : ${state.pasalUtama}
Kelompok Pelanggaran : ${state.kelompok}
Dampak Instansi      : ${state.denganDampak === 'ya' ? 'Ya' : 'Tidak'}
Faktor Utama         : ${state.faktorUtama === 'denganDampak' ? 'Ada Dampak' : 'Tidak Ada'}

Pembobotan Tambahan  : ${pembobotan}
Faktor Meringankan   : ${meringankan}

--------------------------------------
Nilai Akhir          : ${state.nilaiAkhir}
Grade Hukuman        : ${state.grade}
Jenis Hukuman        : ${state.jenisHukuman}
  `
}
// utils/mpjhdHelper.js (lanjutan)

// Hitung total faktor pembobotan berdasarkan input user
export function hitungFaktor(kelompok, subKelompok, input) {
  let faktorUtama = 0;
  let faktorTambahan = 0;
  let faktorMeringankan = 0;

  // Faktor Utama (khusus kelompok tertentu)
  if (kelompok === 'III' && subKelompok === 'khusus_individual') {
    // Berdasarkan jumlah kerugian / penerimaan
    const uang = input.jumlahKerugian || 0;
    if (uang <= 10000000) faktorUtama = 7.5;
    else if (uang <= 50000000) faktorUtama = 15;
    else if (uang <= 100000000) faktorUtama = 22.5;
    else faktorUtama = 30;
  }

  if (kelompok === 'III' && subKelompok === 'khusus_bersama') {
    // Faktor Utama = pembobotan peran
    if (input.peran === 'Pasif') faktorUtama = 10;
    if (input.peran === 'Aktif') faktorUtama = 20;
    if (input.peran === 'Inisiator') faktorUtama = 30;
  }

  if (kelompok === 'IV') {
    if (input.kerugian === 'tidak teridentifikasi') faktorUtama = 7.5;
    else if (input.kerugian <= 50000000) faktorUtama = 15;
    else faktorUtama = 22.5;
  }

  if (kelompok === 'VI') {
    // Faktor Utama di Kelompok VI berdasarkan dampak pelanggaran
    if (input.dampak === 'tidak berdampak') faktorUtama = 0;
    else if (input.dampak === 'unit kerja') faktorUtama = 15;
    else if (input.dampak === 'instansi/tersangka') faktorUtama = 30;
  }

  // Faktor Tambahan
  if (kelompok === 'II' || kelompok === 'V') {
    // Kelompok II dan V (faktor tambahan versi 3,75)
    if (input.banyakPasal === 'dua') faktorTambahan += 3.75;
    if (input.banyakPasal === 'lebihDua') faktorTambahan += 7.5;
    if (input.hukdis === 'pernah1x') faktorTambahan += 3.75;
    if (input.hukdis === 'lebih1x') faktorTambahan += 7.5;
    if (input.kesengajaan === 'lalai') faktorTambahan += 3.75;
    if (input.kesengajaan === 'sengaja') faktorTambahan += 7.5;
    if (input.hambatan === 'tidakKooperatif') faktorTambahan += 3.75;
    if (input.hambatan === 'menghalangi') faktorTambahan += 7.5;
  }

  if (kelompok === 'III' && subKelompok === 'umum') {
    // Kelompok III Umum (faktor tambahan versi 2,5)
    if (input.banyakPasal === 'dua') faktorTambahan += 2.5;
    if (input.banyakPasal === 'lebihDua') faktorTambahan += 5;
    if (input.hukdis === 'pernah1x') faktorTambahan += 15;
    if (input.kesengajaan === 'lalai') faktorTambahan += 2.5;
    if (input.kesengajaan === 'sengaja') faktorTambahan += 5;
    if (input.hambatan === 'tidakKooperatif') faktorTambahan += 2.5;
    if (input.hambatan === 'menghalangi') faktorTambahan += 5;
  }

  if (kelompok === 'III' && subKelompok === 'khusus_individual') {
    // Kelompok III Khusus Individual (faktor tambahan versi 1,25)
    if (input.banyakPasal === 'dua') faktorTambahan += 1.25;
    if (input.banyakPasal === 'lebihDua') faktorTambahan += 2.5;
    if (input.hukdis === 'pernah1x') faktorTambahan += 1.25;
    if (input.hukdis === 'lebih1x') faktorTambahan += 2.5;
    if (input.kesengajaan === 'lalai') faktorTambahan += 1.25;
    if (input.kesengajaan === 'sengaja') faktorTambahan += 2.5;
    if (input.hambatan === 'tidakKooperatif') faktorTambahan += 1.25;
    if (input.hambatan === 'menghalangi') faktorTambahan += 2.5;
  }

  if (kelompok === 'IV') {
    // Kelompok IV (faktor tambahan versi 1,25)
    if (input.banyakPasal === 'dua') faktorTambahan += 1.25;
    if (input.banyakPasal === 'lebihDua') faktorTambahan += 2.5;
    if (input.hukdis === 'pernah1x') faktorTambahan += 1.25;
    if (input.hukdis === 'lebih1x') faktorTambahan += 2.5;
    if (input.kesengajaan === 'lalai') faktorTambahan += 1.25;
    if (input.kesengajaan === 'sengaja') faktorTambahan += 2.5;
    if (input.hambatan === 'tidakKooperatif') faktorTambahan += 1.25;
    if (input.hambatan === 'menghalangi') faktorTambahan += 2.5;
  }

  if (kelompok === 'VI') {
    // Kelompok VI (faktor tambahan khusus)
    if (input.hukdis === 'pernah1x') faktorTambahan += 2.5;
    if (input.hukdis === 'lebih1x') faktorTambahan += 5;
    if (input.hambatan === 'tidakKooperatif') faktorTambahan += 2.5;
    if (input.hambatan === 'menghalangi') faktorTambahan += 5;
  }

  // Faktor Meringankan
  if (input.meringankan === 'kooperatif') faktorMeringankan = 5;
  if (input.meringankan === 'inisiator') faktorMeringankan = 10;

  return {
    faktorUtama,
    faktorTambahan,
    faktorMeringankan,
  };
}

// utils/mpjhdHelper.js (lanjutan)

// Hitung nilai akhir berdasarkan semua faktor
export function calculateFinalScore(nilaiPokok, faktorUtama, faktorTambahan, faktorMeringankan) {
  const nilaiAkhir = nilaiPokok + faktorUtama + faktorTambahan - faktorMeringankan;
  return nilaiAkhir;
}
