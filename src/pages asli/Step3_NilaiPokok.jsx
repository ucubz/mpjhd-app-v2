import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import InputField from '../components/InputField'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'

const Step3_NilaiPokok = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [nilai, setNilai] = useState(state.nilaiPokok || 0)

  const handleNext = () => {
    dispatch({ type: 'SET', key: 'nilaiPokok', value: parseInt(nilai) })
    navigate('/step/4')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Nilai Pokok Pelanggaran
      </h1>

      <Card>
        <div className="flex flex-col gap-4">
          <p className="text-gray-700 text-center">
            Masukkan nilai pokok berdasarkan dampak pelanggaran atau kelompok yang telah dipilih.
          </p>

          <InputField
            label="Nilai Pokok"
            type="number"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          />

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

export default Step3_NilaiPokok
