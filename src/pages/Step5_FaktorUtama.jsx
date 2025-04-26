import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState } from 'react'

export default function Step5_FaktorUtama() {
  const navigate = useNavigate()
  const { dispatch } = useMPJHD()

  const [faktor, setFaktor] = useState('')

  const handleNext = () => {
    if (!faktor) {
      alert('Silakan pilih faktor utama terlebih dahulu.')
      return
    }

    dispatch({ type: 'SET', key: 'faktorUtama', value: faktor })
    navigate('/step/6')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Utama Tambahan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          <p className="text-gray-700 dark:text-gray-200 text-center">
            Apakah ada faktor utama yang memperberat pelanggaran?
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="faktorUtama"
                value="tidak"
                checked={faktor === 'tidak'}
                onChange={(e) => setFaktor(e.target.value)}
                className="accent-primary"
              />
              Tidak ada faktor tambahan
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="faktorUtama"
                value="denganDampak"
                checked={faktor === 'denganDampak'}
                onChange={(e) => setFaktor(e.target.value)}
                className="accent-primary"
              />
              Ada dampak terhadap unit kerja/instansi
            </label>

            {/* Kalau ada faktor lain lagi nanti bisa ditambahkan di sini */}
          </div>

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
