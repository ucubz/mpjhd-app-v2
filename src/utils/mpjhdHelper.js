
// utils/mpjhdHelper.js

// Konversi nilai akhir ke grade hukuman dan jenis hukuman
export function konversiGrade(nilai) {
  if (nilai <= 20) return { grade: 'Ringan 1', hukuman: 'Teguran Lisan' }
  if (nilai <= 40) return { grade: 'Ringan 2', hukuman: 'Teguran Tertulis' }
  if (nilai <= 60) return { grade: 'Sedang 1', hukuman: 'Potongan Tunjangan 25% selama 3 bulan' }
  if (nilai <= 80) return { grade: 'Sedang 2', hukuman: 'Potongan Tunjangan 25% selama 6 bulan' }
  if (nilai <= 100) return { grade: 'Sedang 3', hukuman: 'Potongan Tunjangan 25% selama 9 bulan' }
  if (nilai <= 120) return { grade: 'Berat 1', hukuman: 'Penurunan Jabatan' }
  if (nilai <= 140) return { grade: 'Berat 2', hukuman: 'Pembebasan dari Jabatan' }
  return { grade: 'Berat 3', hukuman: 'Pemberhentian Tidak atas Permintaan Sendiri' }
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
