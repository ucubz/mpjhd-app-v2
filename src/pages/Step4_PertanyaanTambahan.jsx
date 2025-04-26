import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState } from 'react'

export default function Step4_PertanyaanTambahan() {
  const navigate = useNavigate()
  const { dispatch } = useMPJHD()
  
  const [denganDampak, setDenganDampak] = useState('')

  const handleNext = () => {
    if (!denganDampak) {
      alert('Silakan jawab pertanyaan terlebih dahulu.')
      return
    }

    dispatch({ type: 'SET', key: 'denganDampak', value: denganDampak })
    navigate('/step/5')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Pertanyaan Tambahan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <p className="text-gray-700 dark:text-gray-200 text-center">
            Apakah pelanggaran berdampak terhadap unit kerja atau instansi?
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dampak"
                value="ya"
                checked={denganDampak === 'ya'}
                onChange={(e) => setDenganDampak(e.target.value)}
                className="accent-primary"
              />
              Ya, berdampak
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dampak"
                value="tidak"
                checked={denganDampak === 'tidak'}
                onChange={(e) => setDenganDampak(e.target.value)}
                className="accent-primary"
              />
              Tidak berdampak
            </label>
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
