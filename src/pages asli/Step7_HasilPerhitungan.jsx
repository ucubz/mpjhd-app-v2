import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useMPJHD } from '../context/MPJHDContext'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'

const Step7_HasilPerhitungan = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()

  const getPembobotanValue = () => {
    let value = 0
    if (state.pembobotan.banyakPasal) value += 10
    if (state.pembobotan.pernahDihukum) value += 10
    if (state.pembobotan.kesengajaan) value += 10
    if (state.pembobotan.hambatPemeriksaan) value += 10
    return value
  }

  const getMeringankanValue = () => {
    let value = 0
    if (state.meringankan.kooperatif) value += 5
    if (state.meringankan.mengakui) value += 5
    if (state.meringankan.menyesal) value += 5
    if (state.meringankan.tekanan) value += 5
    return value
  }

  const nilaiPokok = state.nilaiPokok || 0
  const tambahan = getPembobotanValue()
  const pengurang = getMeringankanValue()
  const nilaiAkhir = nilaiPokok + tambahan - pengurang

  useEffect(() => {
    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir })
  }, [nilaiAkhir, dispatch])

  const handleNext = () => {
    navigate('/step/8')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hasil Perhitungan Nilai
      </h1>

      <Card>
        <div className="flex flex-col gap-4 text-center">
          <p><strong>Nilai Pokok:</strong> {nilaiPokok}</p>
          <p><strong>Nilai Tambahan (Pembobotan):</strong> {tambahan}</p>
          <p><strong>Nilai Pengurang (Meringankan):</strong> {pengurang}</p>

          <hr className="my-4 border-gray-300" />

          <p className="text-xl font-semibold">
            <strong>Nilai Akhir:</strong> {nilaiAkhir}
          </p>

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

export default Step7_HasilPerhitungan
