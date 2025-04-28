// src/utils/generateHTMLTable.js

export function generateHTMLTable(kelompok, hasilState) {
    switch (kelompok) {
      case 'II':
      case 'III':
      case 'III Umum':
      case 'V':
        return generateKelompokII(hasilState);
      case 'III Khusus Individual':
        return generateKelompokIIIKhususIndividual(hasilState);
      case 'III Khusus Bersama':
        return generateKelompokIIIKhususBersama(hasilState);
      case 'IV':
        return generateKelompokIV(hasilState);
      case 'VI':
        return generateKelompokVI(hasilState);
      default:
        return '<p>Kelompok tidak dikenali</p>';
    }
  }
  
  // Template awal tabel
  const header = `
  <style>
    table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 11pt; }
    th, td { border: 1px solid black; padding: 5px; }
    th { background: #c0c0c0; text-align: center; }
    td { vertical-align: middle; }
  </style>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th colspan="3">Unsur Unsur</th>
        <th>Jumlah</th>
      </tr>
    </thead>
    <tbody>
  `;
  const footer = `
    </tbody>
  </table>
  `;
  
  // Helper kecil
  function row(no, unsur, jumlahLeft = '', jumlahRight = '') {
    return `
      <tr>
        <td style="text-align: right">${no}</td>
        <td colspan="2">${unsur}</td>
        <td style="text-align: right">${jumlahLeft}</td>
        <td style="text-align: right">${jumlahRight}</td>
      </tr>
    `;
  }
  
  function subrow(unsur, jumlahLeft = '', jumlahRight = '') {
    return `
      <tr>
        <td></td>
        <td colspan="2" style="padding-left: 20px">${unsur}</td>
        <td style="text-align: right">${jumlahLeft}</td>
        <td style="text-align: right">${jumlahRight}</td>
      </tr>
    `;
  }
  
  // ====== Kelompok II, III Umum, V ======
  function generateKelompokII(state) {
    return `
  ${header}
  ${row('1.', 'Nilai Pokok', '', state.nilaiPokok)}
  ${row('2.', 'Nilai Tambahan', '', state.nilaiTambahan)}
  ${row('2.1.', 'Faktor Pembobotan Tambahan')}
  ${subrow('Jumlah Pasal', state.faktorTambahan?.jumlahPasal || 0)}
  ${subrow('Rekam jejak', state.faktorTambahan?.rekamJejak || 0)}
  ${subrow('Faktor Kesengajaan', state.faktorTambahan?.kesengajaan || 0)}
  ${subrow('Hambatan Pemeriksaan', state.faktorTambahan?.hambatan || 0)}
  ${row('2.2.', 'Faktor Pembobotan yang meringankan', state.faktorMeringankan ? `(${state.faktorMeringankan.total})` : '(0)')}
  ${row('3.', 'Nilai Akhir', '', state.nilaiAkhir)}
  ${footer}
    `;
  }
  
  // ====== Kelompok III Khusus Individual ======
  function generateKelompokIIIKhususIndividual(state) {
    return `
  ${header}
  ${row('1.', 'Nilai Pokok', '', state.nilaiPokok)}
  ${row('2.', 'Nilai Tambahan', '', state.nilaiTambahan)}
  ${row('2.1.', 'Faktor Pembobotan Utama', state.faktorUtama)}
  ${row('2.2.', 'Faktor Pembobotan Tambahan')}
  ${subrow('Jumlah Pasal', state.faktorTambahan?.jumlahPasal || 0)}
  ${subrow('Rekam jejak', state.faktorTambahan?.rekamJejak || 0)}
  ${subrow('Faktor Kesengajaan', state.faktorTambahan?.kesengajaan || 0)}
  ${subrow('Hambatan Pemeriksaan', state.faktorTambahan?.hambatan || 0)}
  ${row('2.3.', 'Faktor Pembobotan yang meringankan', state.faktorMeringankan ? `(${state.faktorMeringankan.total})` : '(0)')}
  ${row('3.', 'Nilai Akhir', '', state.nilaiAkhir)}
  ${footer}
    `;
  }
  
  // ====== Kelompok III Khusus Bersama ======
  function generateKelompokIIIKhususBersama(state) {
    return `
  ${header}
  ${row('1.', 'Nilai Pokok', '', state.nilaiPokok)}
  ${row('2.', 'Nilai Tambahan', '', state.nilaiTambahan)}
  ${row('2.1.', 'Faktor Pembobotan Peran', state.faktorPeran)}
  ${row('2.2.', 'Faktor Pembobotan Tambahan')}
  ${subrow('Jumlah Uang Diterima', state.faktorTambahan?.jumlahUang || 0)}
  ${row('2.3.', 'Faktor Pembobotan yang meringankan', state.faktorMeringankan ? `(${state.faktorMeringankan.total})` : '(0)')}
  ${row('3.', 'Nilai Akhir', '', state.nilaiAkhir)}
  ${footer}
    `;
  }
  
  // ====== Kelompok IV ======
  function generateKelompokIV(state) {
    return generateKelompokIIIKhususIndividual(state);
  }
  
  // ====== Kelompok VI ======
  function generateKelompokVI(state) {
    return `
  ${header}
  ${row('1.', 'Nilai Pokok', '', state.nilaiPokok)}
  ${row('2.', 'Nilai Tambahan', '', state.nilaiTambahan)}
  ${row('2.1.', 'Faktor Pembobotan Utama', state.faktorUtama)}
  ${row('2.2.', 'Faktor Pembobotan Tambahan')}
  ${subrow('Rekam jejak', state.faktorTambahan?.rekamJejak || 0)}
  ${subrow('Hambatan Pemeriksaan', state.faktorTambahan?.hambatan || 0)}
  ${row('2.3.', 'Faktor Pembobotan yang meringankan', state.faktorMeringankan ? `(${state.faktorMeringankan.total})` : '(0)')}
  ${row('3.', 'Nilai Akhir', '', state.nilaiAkhir)}
  ${footer}
    `;
  }
  