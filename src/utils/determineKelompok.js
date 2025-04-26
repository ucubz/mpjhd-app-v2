// utils/determineKelompok.js

export function determineKelompok(pasal) {
  if (!pasal) return '';

  // Kelompok I: Masuk kerja dan jam kerja
  if (pasal.includes('Pasal 4 huruf f')) {
    return 'I';
  }

  // Kelompok V: Pasal 4 huruf e (harta kekayaan)
  if (pasal.includes('Pasal 4 huruf e')) {
    return 'V';
  }

  // Kelompok V: Pasal 5 angka 2–7
  if (
    pasal.includes('Pasal 5 angka 2') || pasal.includes('Pasal 5 angka 3') ||
    pasal.includes('Pasal 5 angka 4') || pasal.includes('Pasal 5 angka 5') ||
    pasal.includes('Pasal 5 angka 6') || pasal.includes('Pasal 5 angka 7')
  ) {
    return 'V';
  }

  // Kelompok IV: Tindakan sewenang-wenang terhadap bawahan
  if (pasal.includes('Pasal 5 huruf m')) {
    return 'IV';
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

  // Kelompok II: Pelanggaran umum dengan pertimbangan dampak
  if (
    pasal.includes('Pasal 3 huruf a') || pasal.includes('Pasal 3 huruf b') || pasal.includes('Pasal 3 huruf c') ||
    pasal.includes('Pasal 3 huruf d') || pasal.includes('Pasal 3 huruf e') || pasal.includes('Pasal 3 huruf f') ||
    pasal.includes('Pasal 4 huruf c') || pasal.includes('Pasal 4 huruf d') ||
    pasal.includes('Pasal 4 huruf h') ||
    pasal.includes('Pasal 5 huruf f') || pasal.includes('Pasal 5 huruf g') ||
    pasal.includes('Pasal 5 huruf h') || pasal.includes('Pasal 5 huruf i') ||
    pasal.includes('Pasal 5 huruf j')
  ) {
    return 'II';
  }

  // Kelompok VI: Khusus kasus perkawinan/perceraian
  if (pasal.includes('Pasal 8') || pasal.includes('Pasal 9')) {
    return 'VI';
  }

  // Kalau tidak dikenali
  return '';
}
