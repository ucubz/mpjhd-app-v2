export default function SalinClipboardButton({ formatFunction, className = "" }) {
  const handleCopy = async () => {
    const html = formatFunction('html')

    try {
      const blob = new Blob([html], { type: 'text/html' })
      const clipboardItem = new ClipboardItem({ 'text/html': blob })

      await navigator.clipboard.write([clipboardItem])
      alert('✅ Tabel berhasil disalin dalam format tabel (HTML) ke clipboard!')
    } catch (err) {
      console.error(err)
      alert('❌ Gagal menyalin. Coba gunakan browser terbaru (Chrome/Edge).')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all text-sm md:text-base font-medium ${className}`}
    >
      Salin ke Clipboard
    </button>
  )
}
