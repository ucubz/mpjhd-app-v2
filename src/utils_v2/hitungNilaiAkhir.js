import { hitungNilaiKelompokI } from './hitungNilaiKelompokI';
import { tentukanNilaiPokok, pasalBelumDiatur } from './tentukanNilaiPokok';
import { hitungFaktorTambahan } from './hitungFaktorTambahan';
import { hitungFaktorMeringankan } from './hitungFaktorMeringankan';
import { hitungFaktorUtama } from './opsiFaktor';
import { kunciNilaiDalamRentang } from './kunciNilaiDalamRentang';
import { tentukanRentang } from './rentangNilaiHukumanDisiplin';

/** Kunci kelompok untuk tabel faktor tambahan, mis. 'II', 'III_BERSAMA'. */
export function kunciKelompokAktif(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();
  if (kelompok === 'III') return `III_${String(state.tipeKelompokIII || '').toUpperCase()}`;
  return kelompok;
}

/**
 * Nilai Akhir = Nilai Pokok + Faktor Utama (atau Peran) + Faktor Tambahan - Faktor Meringankan,
 * lalu dikunci pada tingkat hukuman milik Nilai Pokok (PMK 123/2023, Lampiran II).
 *
 * @returns {{nilaiPokok, nilaiUtama, nilaiTambahan, pengurangMeringankan,
 *            nilaiSebelumKunci, nilaiAkhir, tingkat, tidakDiatur, peringatan:string[]}}
 */
export function hitungNilaiAkhir(state) {
  const kelompok = String(state.kelompok || '').toUpperCase();
  const peringatan = [];

  // ======= Kelompok I (tidak masuk kerja): nilai langsung dari tabel hari =======
  if (kelompok === 'I') {
    const berturut = state.tipeHariTidakMasuk === 'berturut';
    const nilai = Number(hitungNilaiKelompokI(state.jumlahHariTidakMasuk || 0, berturut)) || 0;
    const tidakDiatur = nilai === 0;
    if (tidakDiatur) {
      peringatan.push('Jumlah hari tersebut tidak diatur dalam tabel PMK 123/2023 (minimal 3 hari).');
    }
    return {
      nilaiPokok: nilai,
      nilaiUtama: 0,
      nilaiTambahan: 0,
      pengurangMeringankan: 0,
      nilaiSebelumKunci: nilai,
      nilaiAkhir: nilai,
      tingkat: tidakDiatur ? '' : tentukanRentang(nilai).tingkat,
      tidakDiatur,
      peringatan,
    };
  }

  // ======= Kelompok II - VI =======
  const nilaiPokok =
    Number(tentukanNilaiPokok(state.kelompok, state.pasalUtama, state.dampak, state.jabatan)) || 0;
  if (pasalBelumDiatur(state.pasalUtama)) {
    peringatan.push(`${state.pasalUtama} belum memiliki nilai pokok pada PMK 123/2023; nilai pokok dipakai 0.`);
  }

  const nilaiUtama = Number(hitungFaktorUtama(state)) || 0;
  const nilaiTambahan = Number(hitungFaktorTambahan(state.faktorPembobotan || {}, kunciKelompokAktif(state))) || 0;
  const pengurangMeringankan =
    Number(hitungFaktorMeringankan(state.faktorMeringankan?.kooperatif, state.faktorMeringankan?.inisiator)) || 0;

  const nilaiSebelumKunci = nilaiPokok + nilaiUtama + nilaiTambahan - pengurangMeringankan;
  const nilaiAkhir = kunciNilaiDalamRentang(nilaiPokok, nilaiSebelumKunci);

  return {
    nilaiPokok,
    nilaiUtama,
    nilaiTambahan,
    pengurangMeringankan,
    nilaiSebelumKunci,
    nilaiAkhir,
    tingkat: tentukanRentang(nilaiPokok).tingkat,
    tidakDiatur: false,
    peringatan,
  };
}
