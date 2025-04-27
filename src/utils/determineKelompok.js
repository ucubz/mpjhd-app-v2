// utils/determineKelompok.js

export function determineKelompok(pasal) {
  if (!pasal) return '';

  // Kelompok I: Masuk kerja dan jam kerja
  if (pasal.includes('Pasal 4 huruf f')) {
    return 'I';
  }

  // Kelompok II: Kewajiban umum dengan pertimbangan dampak
  if (
    pasal.includes('Pasal 3 huruf a') || pasal.includes('Pasal 3 huruf c') || pasal.includes('Pasal 3 huruf d') ||
    pasal.includes('Pasal 3 huruf e') || pasal.includes('Pasal 3 huruf f') || pasal.includes('Pasal 4 huruf c') ||
    pasal.includes('Pasal 4 huruf d') || pasal.includes('Pasal 4 huruf h') || pasal.includes('Pasal 5 huruf f') ||
    pasal.includes('Pasal 5 huruf g') || pasal.includes('Pasal 5 huruf h') || pasal.includes('Pasal 5 huruf i') ||
    pasal.includes('Pasal 5 huruf j')
  ) {
    return 'II';
  }

  // Kelompok III: Penerimaan uang dan kerugian negara
  if (
    pasal.includes('Pasal 4 huruf a') || pasal.includes('Pasal 4 huruf b') ||
    pasal.includes('Pasal 5 huruf a') || pasal.includes('Pasal 5 huruf b') ||
    pasal.includes('Pasal 5 huruf c') || pasal.includes('Pasal 5 huruf d') ||
    pasal.includes('Pasal 5 huruf e') || pasal.includes('Pasal 5 huruf k') ||
    pasal.includes('Pasal 5 huruf l')
  ) {
    return 'III';
  }

  // Kelompok IV: Tindakan terhadap bawahan
  if (pasal.includes('Pasal 5 huruf m')) {
    return 'IV';
  }

  // Kelompok V: Harta kekayaan dan dukungan politik
  if (
    pasal.includes('Pasal 4 huruf e') ||
    pasal.includes('Pasal 5 angka 2') || pasal.includes('Pasal 5 angka 3') ||
    pasal.includes('Pasal 5 angka 4') || pasal.includes('Pasal 5 angka 5') ||
    pasal.includes('Pasal 5 angka 6') || pasal.includes('Pasal 5 angka 7')
  ) {
    return 'V';
  }

  // Kelompok VI: Khusus kasus perkawinan/perceraian
  if (pasal.includes('Terkait Izin Perkawinan') || pasal.includes('Terkait Izin Perceraian')) {
    return 'VI';
  }

  // Kalau tidak dikenali
  return 'Tidak Memiliki Kelompok';
}
