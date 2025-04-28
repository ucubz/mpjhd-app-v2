export function generateHTMLTable(kelompok, state) {
    switch (kelompok) {
      case 'II':
      case 'III':
      case 'III Umum':
      case 'V':
        return generateTableKelompokII(state);
      case 'III Khusus Individual':
        return generateTableKelompokIIIKhususIndividual(state);
      case 'III Khusus Bersama':
        return generateTableKelompokIIIKhususBersama(state);
      case 'IV':
        return generateTableKelompokIV(state);
      case 'VI':
        return generateTableKelompokVI(state);
      default:
        return '<p>Kelompok tidak dikenali</p>';
    }
  }
  
  // =======================
  // Style dasar tabel
  const baseTableStyle = `
    border-collapse:collapse;
    font-family:Arial, sans-serif;
    font-size:11pt;
  `;
  const baseTdStyle = `
    border:1px solid black;
    padding:4px 8px;
    vertical-align:middle;
  `;
  const thStyle = `
    ${baseTdStyle}
    background-color:#c0c0c0;
    text-align:center;
    font-weight:bold;
  `;
  
  const tdRight = `
    ${baseTdStyle}
    text-align:right;
  `;
  const tdLeft = `
    ${baseTdStyle}
    text-align:left;
  `;
  const tdIndent = `
    ${baseTdStyle}
    text-align:left;
    padding-left:24px;
  `;
  
  // =======================
  // Kelompok II, III Umum, V
  function generateTableKelompokII(state) {
    return `
  <table style="${baseTableStyle}" border="1">
  <thead>
    <tr>
      <th style="${thStyle}">No</th>
      <th style="${thStyle}" colspan="3">Unsur Unsur</th>
      <th style="${thStyle}">Jumlah</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="${tdRight}">1.</td><td style="${tdLeft}" colspan="3">Nilai Pokok</td><td style="${tdRight}">${state.nilaiPokok ?? ''}</td>
    </tr>
    <tr>
      <td style="${tdRight}">2.</td><td style="${tdLeft}" colspan="3">Nilai Tambahan</td><td style="${tdRight}">${state.nilaiTambahan ?? ''}</td>
    </tr>
    <tr>
      <td style="${tdRight}">2.1.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Tambahan</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Jumlah Pasal</td><td style="${tdRight}">${state.faktorTambahanJumlahPasal ?? 0}</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Rekam Jejak</td><td style="${tdRight}">${state.faktorTambahanRekamJejak ?? 0}</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Faktor Kesengajaan</td><td style="${tdRight}">${state.faktorTambahanKesengajaan ?? 0}</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Hambatan Pemeriksaan</td><td style="${tdRight}">${state.faktorTambahanHambatan ?? 0}</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}">2.2.</td><td style="${tdIndent}" colspan="2">Faktor Pembobotan yang Meringankan</td><td style="${tdRight}">(${state.faktorMeringankanNilai ?? 0})</td><td style="${tdRight}"></td>
    </tr>
    <tr>
      <td style="${tdRight}">3.</td><td style="${tdLeft}" colspan="3">Nilai Akhir</td><td style="${tdRight}">${state.nilaiAkhir ?? ''}</td>
    </tr>
  </tbody>
  </table>
    `;
  }
  
  // =======================
  // Kelompok III Khusus Individual
  function generateTableKelompokIIIKhususIndividual(state) {
    return `
  <table style="${baseTableStyle}" border="1">
  <thead>
    <tr>
      <th style="${thStyle}">No</th>
      <th style="${thStyle}" colspan="3">Unsur Unsur</th>
      <th style="${thStyle}">Jumlah</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="${tdRight}">1.</td><td style="${tdLeft}" colspan="3">Nilai Pokok</td><td style="${tdRight}">${state.nilaiPokok ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.</td><td style="${tdLeft}" colspan="3">Nilai Tambahan</td><td style="${tdRight}">${state.nilaiTambahan ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.1.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Utama</td><td style="${tdRight}">${state.faktorUtama ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.2.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Tambahan</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Jumlah Pasal</td><td style="${tdRight}">${state.faktorTambahanJumlahPasal ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Rekam Jejak</td><td style="${tdRight}">${state.faktorTambahanRekamJejak ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Faktor Kesengajaan</td><td style="${tdRight}">${state.faktorTambahanKesengajaan ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Hambatan Pemeriksaan</td><td style="${tdRight}">${state.faktorTambahanHambatan ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">2.3.</td><td style="${tdIndent}" colspan="2">Faktor Pembobotan yang Meringankan</td><td style="${tdRight}">(${state.faktorMeringankanNilai ?? 0})</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">3.</td><td style="${tdLeft}" colspan="3">Nilai Akhir</td><td style="${tdRight}">${state.nilaiAkhir ?? ''}</td></tr>
  </tbody>
  </table>
    `;
  }
  
  // =======================
  // Kelompok III Khusus Bersama
  function generateTableKelompokIIIKhususBersama(state) {
    return `
  <table style="${baseTableStyle}" border="1">
  <thead>
    <tr>
      <th style="${thStyle}">No</th>
      <th style="${thStyle}" colspan="3">Unsur Unsur</th>
      <th style="${thStyle}">Jumlah</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="${tdRight}">1.</td><td style="${tdLeft}" colspan="3">Nilai Pokok</td><td style="${tdRight}">${state.nilaiPokok ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.</td><td style="${tdLeft}" colspan="3">Nilai Tambahan</td><td style="${tdRight}">${state.nilaiTambahan ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.1.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Peran</td><td style="${tdRight}">${state.faktorPeran ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.2.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Tambahan</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Jumlah Uang Diterima</td><td style="${tdRight}">${state.faktorTambahanJumlahUang ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">2.3.</td><td style="${tdIndent}" colspan="2">Faktor Pembobotan yang Meringankan</td><td style="${tdRight}">(${state.faktorMeringankanNilai ?? 0})</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">3.</td><td style="${tdLeft}" colspan="3">Nilai Akhir</td><td style="${tdRight}">${state.nilaiAkhir ?? ''}</td></tr>
  </tbody>
  </table>
    `;
  }
  
  // =======================
  // Kelompok IV
  function generateTableKelompokIV(state) {
    return generateTableKelompokIIIKhususIndividual(state);
  }
  
  // =======================
  // Kelompok VI
  function generateTableKelompokVI(state) {
    return `
  <table style="${baseTableStyle}" border="1">
  <thead>
    <tr>
      <th style="${thStyle}">No</th>
      <th style="${thStyle}" colspan="3">Unsur Unsur</th>
      <th style="${thStyle}">Jumlah</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="${tdRight}">1.</td><td style="${tdLeft}" colspan="3">Nilai Pokok</td><td style="${tdRight}">${state.nilaiPokok ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.</td><td style="${tdLeft}" colspan="3">Nilai Tambahan</td><td style="${tdRight}">${state.nilaiTambahan ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.1.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Utama</td><td style="${tdRight}">${state.faktorUtama ?? ''}</td></tr>
    <tr><td style="${tdRight}">2.2.</td><td style="${tdLeft}" colspan="3">Faktor Pembobotan Tambahan</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Rekam Jejak</td><td style="${tdRight}">${state.faktorTambahanRekamJejak ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}"></td><td style="${tdIndent}" colspan="2">Hambatan Pemeriksaan</td><td style="${tdRight}">${state.faktorTambahanHambatan ?? 0}</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">2.3.</td><td style="${tdIndent}" colspan="2">Faktor Pembobotan yang Meringankan</td><td style="${tdRight}">(${state.faktorMeringankanNilai ?? 0})</td><td style="${tdRight}"></td></tr>
    <tr><td style="${tdRight}">3.</td><td style="${tdLeft}" colspan="3">Nilai Akhir</td><td style="${tdRight}">${state.nilaiAkhir ?? ''}</td></tr>
  </tbody>
  </table>
    `;
  }
  