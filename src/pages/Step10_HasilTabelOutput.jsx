import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { formatClipboard } from '../utils/mpjhdHelper'   // 🔥 Import fungsi helper
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import HasilTabel from '../components/HasilTabel'
import Stepper from '../components/Stepper'

const Step10_HasilAkhir = () => {
  const { state, dispatch } = useMPJHD()
  const navigate = useNavigate()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatClipboard(state))
      alert('Tabel berhasil disalin ke clipboard!')
    } catch (err) {
      alert('Gagal menyalin!')
    }
  }

  const handleReset = () => {
    const confirmReset = window.confirm('Yakin ingin mengulang dari awal? Semua data akan dihapus.')
    if (confirmReset) {
      dispatch({ type: 'RESET' })
      navigate('/')
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Akhir MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <HasilTabel data={state} />

          <div className="flex justify-between gap-4">
            <BackButton className="flex-1" />
            <Button onClick={handleCopy} className="flex-1 bg-green-600 hover:bg-green-700">
              Salin ke Clipboard
            </Button>
          </div>

          <Button
            onClick={handleReset}
            className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Ulang dari Awal
          </Button>
        </div>
      </Card>

      <Stepper />
    </PageWrapper>
  )
}

export default Step10_HasilAkhir
