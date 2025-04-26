import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useEffect, useState } from 'react'

export default function Step4_PertanyaanTambahan() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [dampak, setDampak] = useState('')

  useEffect(() => {
    // Kalau kelompok bukan II, langsung skip ke Step5
    if (state.kelompok !== 'II') {
      navigate('/step/5')
    }
  }, [state.kelompok, navigate])

  const handleNext = () => {
    if (!dampak) {
      alert('Silakan pilih dampak pelanggaran terlebih dahulu.')
      return
    }

    dispatch({ type: 'SET', key: 'dampak', value: dampak })
    navigate('/step/5')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Pertanyaan Tambahan
      </h1>

      <Card>
        <div className="flex flex-col gap-8">
          {/* Pertanyaan Dampak */}
          <div className="flex flex-col gap-4">
            <p className="text-gray-700 dark:text-gray-200 text-center">
              Sebutkan dampak pelanggaran!
            </p>
            <div className="flex flex-col gap-2">
              {['Unit Kerja', 'Instansi', 'Negara'].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="dampak"
                    value={item}
                    checked={dampak === item}
                    onChange={(e) => setDampak(e.target.value)}
                    className="accent-primary"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={4} />
    </PageWrapper>
  )
}
