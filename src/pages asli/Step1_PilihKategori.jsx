import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'
import PasalSelector from '../components/PasalSelector'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'

const Step1_PilihKategori = () => {
  const navigate = useNavigate()
  const { dispatch } = useMPJHD()
  const [kategori, setKategori] = useState('')
  const [pasal, setPasal] = useState('')

  const handleSubmit = () => {
    if (kategori && pasal) {
      dispatch({ type: 'SET', key: 'kategori', value: kategori })
      dispatch({ type: 'SET', key: 'pasalUtama', value: pasal })
      navigate('/step/2')
    } else {
      alert('Silakan pilih kategori dan pasal terlebih dahulu.')
    }
  }

  return (
    <PageWrapper centerContent> 
      <h1 className="text-2xl font-bold text-center mb-8">
        Pilih Kategori Pelanggaran
      </h1>

      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="kategori"
                value="kewajiban"
                onChange={(e) => setKategori(e.target.value)}
                className="accent-primary"
              />
              Melanggar KEWAJIBAN
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="kategori"
                value="larangan"
                onChange={(e) => setKategori(e.target.value)}
                className="accent-primary"
              />
              Melakukan LARANGAN
            </label>
          </div>

          {kategori && (
            <PasalSelector
              kategori={kategori}
              selected={pasal}
              onChange={(val) => setPasal(val)}
            />
          )}

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleSubmit} className="flex-1">
              Lanjut
            </Button>
          </div>

        </div>
      </Card>
      <Stepper />
    </PageWrapper>
  )
}

export default Step1_PilihKategori
