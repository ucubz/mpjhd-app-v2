// src/components/HasilTabelAngka.jsx

import { useMemo } from 'react';

// Komponen utama
export default function HasilTabelAngka({ kelompok, hasilState }) {
  const tabelHTML = useMemo(() => {
    switch (kelompok) {
      case 'II':
        return renderKelompokII(hasilState);
      case 'III':
      case 'III Umum':
        return renderKelompokIIIUmum(hasilState);
      case 'III Khusus Individual':
        return renderKelompokIIIKhususIndividual(hasilState);
      case 'III Khusus Bersama':
        return renderKelompokIIIKhususBersama(hasilState);
      case 'IV':
        return renderKelompokIV(hasilState);
      case 'V':
        return renderKelompokV(hasilState);
      case 'VI':
        return renderKelompokVI(hasilState);
      default:
        return <p>Kelompok tidak dikenali.</p>;
    }
  }, [kelompok, hasilState]);

  return (
    <div id="tabel-angka" className="overflow-x-auto border rounded-xl p-4 bg-white dark:bg-gray-800 shadow">
      {tabelHTML}
    </div>
  );
}

// =============================
// Helper Functions
// =============================

// Format faktor meringankan (objek ke string)
function formatFaktorMeringankan(obj) {
  if (!obj) return '-';
  const faktorList = [];
  if (obj.kooperatif) faktorList.push('Kooperatif');
  if (obj.mengakui) faktorList.push('Mengakui Kesalahan');
  if (obj.menyesal) faktorList.push('Menunjukkan Penyesalan');
  if (obj.tekanan) faktorList.push('Ada Tekanan Psikis');
  return faktorList.length > 0 ? faktorList.join(', ') : 'Tidak ada';
}

// Hitung total faktor tambahan
function totalFaktorTambahan(faktorTambahan) {
  if (!Array.isArray(faktorTambahan)) return 0;
  return faktorTambahan.reduce((acc, item) => acc + (item.nilai || 0), 0);
}

// =============================
// Fungsi render tabel per kelompok
// =============================

// Kelompok II, III Umum, V (struktur sederhana)
function renderKelompokII(hasil) {
  return (
    <Table>
      <Row no="1" unsur="Nilai Pokok" jumlah={hasil.nilaiPokok} />
      <Row no="2" unsur="Nilai Tambahan" jumlah={hasil.nilaiTambahan} />
      <Row no="2.1" unsur="Faktor Pembobotan Tambahan" jumlah={totalFaktorTambahan(hasil.faktorTambahan)} />
      {Array.isArray(hasil.faktorTambahan) && hasil.faktorTambahan.map((f, i) => (
        <Row key={`tambahan-${i}`} unsur={f.nama} jumlah={f.nilai} />
      ))}
      <Row no="2.2" unsur="Faktor Pembobotan yang Meringankan" jumlah={formatFaktorMeringankan(hasil.faktorMeringankan)} />
      <Row no="3" unsur="Nilai Akhir" jumlah={hasil.nilaiAkhir} />
    </Table>
  );
}

function renderKelompokIIIUmum(hasil) {
  return renderKelompokII(hasil);
}

function renderKelompokV(hasil) {
  return renderKelompokII(hasil);
}

// Kelompok III Khusus Individual
function renderKelompokIIIKhususIndividual(hasil) {
  return (
    <Table>
      <Row no="1" unsur="Nilai Pokok" jumlah={hasil.nilaiPokok} />
      <Row no="2" unsur="Nilai Tambahan" jumlah={hasil.nilaiTambahan} />
      <Row no="2.1" unsur="Faktor Pembobotan Utama" jumlah={hasil.faktorUtama} />
      <Row no="2.2" unsur="Faktor Pembobotan Tambahan" jumlah={totalFaktorTambahan(hasil.faktorTambahan)} />
      {Array.isArray(hasil.faktorTambahan) && hasil.faktorTambahan.map((f, i) => (
        <Row key={`tambahan-iiikhusus-${i}`} unsur={f.nama} jumlah={f.nilai} />
      ))}
      <Row no="2.3" unsur="Faktor Pembobotan yang Meringankan" jumlah={formatFaktorMeringankan(hasil.faktorMeringankan)} />
      <Row no="3" unsur="Nilai Akhir" jumlah={hasil.nilaiAkhir} />
    </Table>
  );
}

// Kelompok III Khusus Bersama
function renderKelompokIIIKhususBersama(hasil) {
  return (
    <Table>
      <Row no="1" unsur="Nilai Pokok" jumlah={hasil.nilaiPokok} />
      <Row no="2" unsur="Nilai Tambahan" jumlah={hasil.nilaiTambahan} />
      <Row no="2.1" unsur="Faktor Pembobotan Peran" jumlah={hasil.faktorPeran} />
      <Row no="2.2" unsur="Faktor Pembobotan Tambahan" jumlah={totalFaktorTambahan(hasil.faktorTambahan)} />
      {Array.isArray(hasil.faktorTambahan) && hasil.faktorTambahan.map((f, i) => (
        <Row key={`tambahan-bersama-${i}`} unsur={f.nama} jumlah={f.nilai} />
      ))}
      <Row no="2.3" unsur="Faktor Pembobotan yang Meringankan" jumlah={formatFaktorMeringankan(hasil.faktorMeringankan)} />
      <Row no="3" unsur="Nilai Akhir" jumlah={hasil.nilaiAkhir} />
    </Table>
  );
}

// Kelompok IV
function renderKelompokIV(hasil) {
  return renderKelompokIIIKhususIndividual(hasil);
}

// Kelompok VI
function renderKelompokVI(hasil) {
  return renderKelompokIIIKhususIndividual(hasil);
}

// =============================
// Komponen Table dan Row
// =============================

function Table({ children }) {
  return (
    <table className="table-auto w-full text-sm text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700">
          <th className="border p-2">No</th>
          <th className="border p-2">Unsur Unsur</th>
          <th className="border p-2">Jumlah</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Row({ no = "", unsur, jumlah = "" }) {
  return (
    <tr>
      <td className="border p-2">{no}</td>
      <td className="border p-2">{unsur}</td>
      <td className="border p-2">{jumlah}</td>
    </tr>
  );
}
