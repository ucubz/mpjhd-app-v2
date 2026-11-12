// Angka gaya Indonesia: 7.5 -> "7,5"
export function formatNilai(n) {
  if (n === null || n === undefined || n === '') return '';
  return String(n).replace('.', ',');
}
