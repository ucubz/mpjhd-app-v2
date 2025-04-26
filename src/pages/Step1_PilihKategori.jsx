import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'

export default function Step1_PilihKategori() {
  const navigate = useNavigate()
  const { dispatch } = useMPJHD()
  const [kategori, setKategori] = useState('')

  const handleNext = () => {
    if (!kategori) {
      alert('Silakan pilih kategori terlebih dahulu.')
      return
    }

    dispatch({ type: 'SET', key: 'kategori', value: kategori.toUpperCase() })
    navigate('/step/2')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Pilih Kategori Pelanggaran
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="kategori"
                value="KEWAJIBAN"
                checked={kategori === 'KEWAJIBAN'}
                onChange={(e) => setKategori(e.target.value)}
                className="accent-primary"
              />
              Melanggar KEWAJIBAN
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="kategori"
                value="LARANGAN"
                checked={kategori === 'LARANGAN'}
                onChange={(e) => setKategori(e.target.value)}
                className="accent-primary"
              />
              Melakukan LARANGAN
            </label>
          </div>

          <Button onClick={handleNext}>
            Lanjut
          </Button>
        </div>
      </Card>

      <Stepper currentStep={1} />
    </PageWrapper>
  )
}
