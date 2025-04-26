import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useEffect, useState } from 'react'
import { determineKelompok } from '../utils/determineKelompok'

export default function Step3_KelompokOtomatis() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [kelompok, setKelompok] = useState('')

  useEffect(() => {
    const hasilKelompok = determineKelompok(state.pasalUtama)
    setKelompok(hasilKelompok)
    dispatch({ type: 'SET', key: 'kelompok', value: hasilKelompok })
  }, [state.pasalUtama, dispatch])

  const handleNext = () => {
    navigate('/step/4')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Kelompokkan Pelanggaran (Otomatis)
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Berdasarkan pasal utama, pelanggaran dikelompokkan ke:
          </p>

          <p className="text-xl font-bold text-primary dark:text-primary-dark">
            {kelompok || 'Sedang menentukan...'}
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
