import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../components/StepLayout';
import Button from '../components/Button';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import useRequireStep from '../hooks/useRequireStep';
import { konversiGrade } from '../utils_v2/konversiGrade';
import { hitungNilaiAkhir, kunciKelompokAktif } from '../utils_v2/hitungNilaiAkhir';
import { hitungFaktorTambahanRinci } from '../utils_v2/hitungFaktorTambahan';
import { generateHTMLTable } from '../utils_v2/generateHTMLTable';
import { NILAI_KOOPERATIF, NILAI_INISIATOR } from '../utils_v2/hitungFaktorMeringankan';
import { formatNilai } from '../utils_v2/formatNilai';

const WARNA_TINGKAT = {
  Ringan: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
  Sedang: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  Berat: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
};

const LABEL_FAKTOR = {
  banyakPasal: 'Banyaknya jenis pelanggaran',
  hukdis: 'Riwayat hukuman disiplin',
  kesengajaan: 'Faktor kesengajaan',
  hambatan: 'Hambatan pemeriksaan',
  jumlahKerugian: 'Jumlah uang/kerugian',
};

function Baris({ label, nilai, tebal = false, indent = false }) {
  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className={`py-2 pr-3 ${indent ? 'pl-4 text-gray-600 dark:text-gray-300' : ''} ${tebal ? 'font-semibold' : ''}`}>
        {label}
      </td>
      <td className={`py-2 text-right tabular-nums ${tebal ? 'font-semibold' : ''}`}>{nilai}</td>
    </tr>
  );
}

export default function Step7_HasilAkhir() {
  useRequireStep(['kelompok', 'pasalUtama'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const resetMPJHD = useResetMPJHD();
  const navigate = useNavigate();
  const [pesanSalin, setPesanSalin] = useState('');

  // Setelah sampai hasil, peringatan "perubahan belum disimpan" saat menutup tab dimatikan
  useEffect(() => {
    dispatch({ type: 'SET_FINISHED', value: true });
    return () => dispatch({ type: 'SET_FINISHED', value: false });
  }, [dispatch]);

  const kelompok = String(state.kelompok || '').toUpperCase();
  const tipeKelompokIII = state.tipeKelompokIII || '';

  const hasil = hitungNilaiAkhir(state);
  const { nilaiPokok, nilaiUtama, nilaiTambahan, pengurangMeringankan, nilaiSebelumKunci, nilaiAkhir, tingkat, tidakDiatur, peringatan } = hasil;

  const hasilGrade = tidakDiatur
    ? { grade: '-', hukuman: 'Tidak diatur dalam tabel PMK 123/2023' }
    : konversiGrade(nilaiAkhir);

  const rincianTambahan =
    kelompok !== 'I' ? hitungFaktorTambahanRinci(state.faktorPembobotan, kunciKelompokAktif(state)) : {};

  const meringankan = state.faktorMeringankan || {};
  const disesuaikan = !tidakDiatur && kelompok !== 'I' && nilaiSebelumKunci !== nilaiAkhir;

  const labelUtama = kelompok === 'III' && tipeKelompokIII === 'bersama' ? 'Faktor peran' : 'Faktor pembobotan utama';
  const adaFaktorUtama = ['III', 'IV', 'VI'].includes(kelompok) && tipeKelompokIII !== 'umum';

  const kunciTabel =
    kelompok === 'III'
      ? { umum: 'III Umum', individu: 'III Khusus Individual', bersama: 'III Khusus Bersama' }[tipeKelompokIII] || 'III Umum'
      : kelompok;

  const handleCopyTable = async () => {
    const html = generateHTMLTable(kunciTabel, {
      ...state,
      nilaiPokok,
      nilaiUtama,
      nilaiTambahan,
      nilaiTambahanTotal: nilaiUtama + nilaiTambahan - pengurangMeringankan,
      pengurangMeringankan,
      faktorMeringankanNilai: pengurangMeringankan,
      nilaiAkhir,
      grade: hasilGrade.grade,
      jenisHukuman: hasilGrade.hukuman,
      rincianTambahan,
      faktorTambahanJumlahPasal: rincianTambahan.banyakPasal ?? 0,
      faktorTambahanRekamJejak: rincianTambahan.hukdis ?? 0,
      faktorTambahanKesengajaan: rincianTambahan.kesengajaan ?? 0,
      faktorTambahanHambatan: rincianTambahan.hambatan ?? 0,
      faktorTambahanJumlahUang: rincianTambahan.jumlahKerugian ?? 0,
    });
    try {
      const blob = new Blob([html], { type: 'text/html' });
      await navigator.clipboard.write([new window.ClipboardItem({ 'text/html': blob })]);
      setPesanSalin('Tabel berhasil disalin. Tempel di Word atau Excel.');
    } catch {
      setPesanSalin('Gagal menyalin. Coba gunakan Chrome atau Edge versi terbaru.');
    }
  };

  const hitungUlang = () => {
    resetMPJHD();
    navigate('/step/1');
  };

  return (
    <StepLayout step={7} title="Hasil Penentuan Hukuman Disiplin" hideNext>
      {peringatan.length > 0 && (
        <div className="mb-4 rounded-xl border border-amber-400 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200">
          {peringatan.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}

      {/* Hasil utama */}
      <div className="rounded-2xl border border-gray-200 p-4 text-center dark:border-gray-700">
        {tingkat && (
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${WARNA_TINGKAT[tingkat] || ''}`}>
            Hukuman Disiplin {tingkat}
          </span>
        )}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Nilai Akhir</p>
        <p className="text-4xl font-bold tabular-nums">{formatNilai(nilaiAkhir)}</p>
        <p className="mt-1 text-sm font-semibold text-blue-700 dark:text-blue-300">{hasilGrade.grade}</p>
        <p className="mt-2 text-base font-semibold">{hasilGrade.hukuman}</p>
        {disesuaikan && (
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
            Hasil hitungan {formatNilai(nilaiSebelumKunci)} disesuaikan ke batas tingkat hukuman sesuai nilai pokok.
          </p>
        )}
      </div>

      {/* Rincian */}
      <h3 className="mt-6 mb-1 text-sm font-semibold">Rincian perhitungan</h3>
      <table className="w-full text-sm">
        <tbody>
          <Baris label="Nilai pokok" nilai={formatNilai(nilaiPokok)} />
          {kelompok === 'I' ? (
            <Baris label="Jumlah hari tidak masuk kerja" nilai={`${state.jumlahHariTidakMasuk} hari`} indent />
          ) : (
            <>
              {adaFaktorUtama && <Baris label={labelUtama} nilai={`+${formatNilai(nilaiUtama)}`} />}
              <Baris label="Faktor pembobotan tambahan" nilai={`+${formatNilai(nilaiTambahan)}`} />
              {Object.entries(rincianTambahan).map(([k, v]) => (
                <Baris key={k} label={LABEL_FAKTOR[k] || k} nilai={formatNilai(v)} indent />
              ))}
              <Baris label="Faktor meringankan" nilai={`−${formatNilai(pengurangMeringankan)}`} />
              {meringankan.kooperatif && <Baris label="Kooperatif" nilai={`−${NILAI_KOOPERATIF}`} indent />}
              {meringankan.inisiator && <Baris label="Inisiator pengungkapan" nilai={`−${NILAI_INISIATOR}`} indent />}
            </>
          )}
          <Baris label="Nilai akhir" nilai={formatNilai(nilaiAkhir)} tebal />
        </tbody>
      </table>

      <div className="mt-6 space-y-2">
        {kelompok !== 'I' && (
          <>
            <Button onClick={handleCopyTable}>Salin tabel ke clipboard</Button>
            {pesanSalin && (
              <p role="status" className="text-center text-xs text-gray-600 dark:text-gray-300">
                {pesanSalin}
              </p>
            )}
          </>
        )}
        <Button onClick={hitungUlang} className="!bg-gray-100 !text-gray-800 hover:!bg-gray-200 dark:!bg-gray-700 dark:!text-gray-100 dark:hover:!bg-gray-600">
          Hitung kasus baru
        </Button>
      </div>
    </StepLayout>
  );
}
