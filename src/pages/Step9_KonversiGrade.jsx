import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useEffect, useState } from 'react'

export default function Step9_GradeHukuman() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [grade, setGrade] = useState('')
  const [jenisHukuman, setJenisHukuman] = useState('')

  useEffect(() => {
    const konversiGrade = (nilai) => {
      if (nilai <= 20) return { grade: 'Ringan 1', hukuman: 'Teguran Lisan' }
      if (nilai <= 40) return { grade: 'Ringan 2', hukuman: 'Teguran Tertulis' }
      if (nilai <= 60) return { grade: 'Sedang 1', hukuman: 'Potongan Tunjangan 25% selama 3 bulan' }
      if (nilai <= 80) return { grade: 'Sedang 2', hukuman: 'Potongan Tunjangan 25% selama 6 bulan' }
      if (nilai <= 100) return { grade: 'Sedang 3', hukuman: 'Potongan Tunjangan 25% selama 9 bulan' }
      if (nilai <= 120) return { grade: 'Berat 1', hukuman: 'Penurunan Jabatan' }
      if (nilai <= 140) return { grade: 'Berat 2', hukuman: 'Pembebasan dari Jabatan' }
      return { grade: 'Berat 3', hukuman: 'Pemberhentian Tidak atas Permintaan Sendiri' }
    }

    const hasil = konversiGrade(state.nilaiAkhir)
    setGrade(hasil.grade)
    setJenisHukuman(hasil.hukuman)

    dispatch({ type: 'SET', key: 'grade', value: hasil.grade })
    dispatch({ type: 'SET', key: 'jenisHukuman', value: hasil.hukuman })
  }, [state.nilaiAkhir, dispatch])

  const handleNext = () => {
    navigate('/step/10')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Grade Hukuman Disiplin
      </h1>

      <Card>
        <div className="flex flex-col gap-6 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Berdasarkan perhitungan nilai akhir:
          </p>

          <p className="text-3xl font-bold text-primary dark:text-primary-dark">
            {grade}
          </p>

          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            {jenisHukuman}
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
