import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { konversiGrade } from '../utils/mpjhdHelper'   // 🔥 Import fungsi helper
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'

const Step8_HitungHasilMPJHD = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()

  const nilaiAkhir = (state.nilaiPokok || 0)
    + (state.faktorUtamaValue || 0)
    + (state.pembobotanTambahanValue || 0)
    - (state.meringankanValue || 0)

  const { grade, hukuman } = konversiGrade(nilaiAkhir)   // 🔥 Konversi nilai ke grade dan hukuman

  const handleNext = () => {
    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir })
    dispatch({ type: 'SET', key: 'grade', value: grade })
    dispatch({ type: 'SET', key: 'jenisHukuman', value: hukuman })
    navigate('/step/9')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hitung Nilai Akhir MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-4 text-center">
          <p><strong>Nilai Akhir:</strong> {nilaiAkhir}</p>
          <p><strong>Grade Hukuman:</strong> {grade}</p>
          <p><strong>Jenis Hukuman Disiplin:</strong> {hukuman}</p>

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper />
    </PageWrapper>
  )
}

export default Step8_HitungHasilMPJHD
