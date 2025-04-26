import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/step/1')
  }

  return (
    <PageWrapper>
  <h1 className="text-3xl font-bold text-center mb-6">
    Aplikasi Perhitungan MPJHD
  </h1>

  <Card>
    <div className="flex flex-col gap-6 text-gray-700 max-w-md mx-auto text-center">
      <p>
        Alat bantu ini dirancang untuk membantu menghitung jenis hukuman disiplin berdasarkan
        <strong> PMK 123 Tahun 2023 </strong> dan
        <strong> PP 94 Tahun 2021</strong>. Jawablah pertanyaan langkah demi langkah,
        dan sistem akan menampilkan jenis hukuman yang sesuai.
      </p>

      <Button onClick={handleStart}>
        Mulai Hitung MPJHD
      </Button>
    </div>
  </Card>
</PageWrapper>

  )
}

export default LandingPage
