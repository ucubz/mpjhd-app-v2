// utils/determineKelompok.js

export function determineKelompok(pasal) {
  if (!pasal) return ''

  // Kelompok I: Jam Kerja
  if (pasal.includes('Pasal 4 huruf f') || pasal.includes('Pasal 4 huruf g')) {
    return 'Kelompok I'
  }

  // Kelompok V: Pasal 4 huruf e (jenis jabatan dipertanyakan di step lanjut)
  if (pasal.includes('Pasal 4 huruf e')) {
    return 'Kelompok V'
  }

  // Kelompok II: Mempertimbangkan Dampak
  if (
    pasal.includes('Pasal 3 huruf a') || pasal.includes('Pasal 3 huruf b') || pasal.includes('Pasal 3 huruf c') ||
    pasal.includes('Pasal 3 huruf d') || pasal.includes('Pasal 3 huruf e') || pasal.includes('Pasal 3 huruf f') ||
    pasal.includes('Pasal 4 huruf c') || pasal.includes('Pasal 4 huruf d') || pasal.includes('Pasal 4 huruf g') ||
    pasal.includes('Pasal 4 huruf h') ||
    pasal.includes('Pasal 5 huruf f') || pasal.includes('Pasal 5 huruf g') || pasal.includes('Pasal 5 huruf h') ||
    pasal.includes('Pasal 5 huruf i') || pasal.includes('Pasal 5 huruf j')
  ) {
    return 'Kelompok II'
  }

  // Kelompok III: Penerimaan uang / kerugian negara
  if (
    pasal.includes('Pasal 4 huruf a') || pasal.includes('Pasal 4 huruf b') ||
    pasal.includes('Pasal 5 huruf a') || pasal.includes('Pasal 5 huruf b') ||
    pasal.includes('Pasal 5 huruf c') || pasal.includes('Pasal 5 huruf d') ||
    pasal.includes('Pasal 5 huruf e') || pasal.includes('Pasal 5 huruf k') ||
    pasal.includes('Pasal 5 huruf l')
  ) {
    return 'Kelompok III'
  }

  // Kelompok IV: Tindakan sewenang-wenang
  if (pasal.includes('Pasal 5 huruf m')) {
    return 'Kelompok IV'
  }

  // Kelompok V: Pasal 5 angka 2-7
  if (
    pasal.includes('Pasal 5 angka 2') || pasal.includes('Pasal 5 angka 3') ||
    pasal.includes('Pasal 5 angka 4') || pasal.includes('Pasal 5 angka 5') ||
    pasal.includes('Pasal 5 angka 6') || pasal.includes('Pasal 5 angka 7')
  ) {
    return 'Kelompok V'
  }

  // Kelompok VI: Izin perkawinan / perceraian
  if (pasal.includes('perkawinan') || pasal.includes('perceraian')) {
    return 'Kelompok VI'
  }

  // Default fallback
  return 'Kelompok II'
}
