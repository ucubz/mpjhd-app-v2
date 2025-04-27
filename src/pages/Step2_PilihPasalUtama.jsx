import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import PasalSelector from '../components/PasalSelector'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState } from 'react'

export default function Step2_PilihPasalUtama() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [pasal, setPasal] = useState(state.pasalUtama || '')

  const handleNext = () => {
    if (!pasal) {
      alert('Silakan pilih pasal yang dilanggar.')
      return
    }
    dispatch({ type: 'SET', key: 'pasalUtama', value: pasal })
    navigate('/step/3')
  }

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pilih Pasal Utama
      </h1>

      <Card className="flex flex-col gap-6 p-4 sm:p-6">
        <PasalSelector
          kategori={state.kategori}
          selected={pasal}
          onChange={setPasal}
        />

        <div className="flex justify-between gap-4 mt-6">
          <BackButton className="flex-1" />
          <Button onClick={handleNext} className="flex-1">
            Lanjut
          </Button>
        </div>
      </Card>

      <Stepper currentStep={2} />
    </PageWrapper>
  )
}
