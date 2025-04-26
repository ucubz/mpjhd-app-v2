import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'

const kelompokOpsi = ['Kelompok I', 'Kelompok II', 'Kelompok III', 'Kelompok IV', 'Kelompok V', 'Kelompok VI']

const Step2_Pengelompokan = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [kelompok, setKelompok] = useState(state.kelompok || '')

  const handleNext = () => {
    if (kelompok) {
      dispatch({ type: 'SET', key: 'kelompok', value: kelompok })
      navigate('/step/3')
    } else {
      alert('Silakan pilih kelompok terlebih dahulu.')
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Kelompokkan Pelanggaran
      </h1>

      <Card>
        <div className="flex flex-col gap-4">
          <p className="text-gray-700 text-center">
            Berdasarkan pasal utama, pilih kelompok pelanggaran:
          </p>

          <div className="flex flex-col gap-2">
            {kelompokOpsi.map((k, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="kelompok"
                  value={k}
                  checked={kelompok === k}
                  onChange={(e) => setKelompok(e.target.value)}
                  className="accent-primary"
                />
                {k}
              </label>
            ))}
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

export default Step2_Pengelompokan
