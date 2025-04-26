import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'

export default function Step7_FaktorMeringankan() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()

  const meringankan = state.meringankan || {
    kooperatif: false,
    mengakui: false,
    menyesal: false,
    tekanan: false,
  }

  const toggle = (key) => {
    dispatch({ type: 'SET_MERINGANKAN', key, value: !meringankan[key] })
  }

  const handleNext = () => {
    navigate('/step/8')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Meringankan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          <p className="text-gray-700 dark:text-gray-200 text-center">
            Centang faktor-faktor meringankan berikut jika ada:
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meringankan.kooperatif}
                onChange={() => toggle('kooperatif')}
                className="accent-primary"
              />
              Kooperatif selama pemeriksaan
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meringankan.mengakui}
                onChange={() => toggle('mengakui')}
                className="accent-primary"
              />
              Mengakui kesalahan secara jujur
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meringankan.menyesal}
                onChange={() => toggle('menyesal')}
                className="accent-primary"
              />
              Menunjukkan rasa penyesalan
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meringankan.tekanan}
                onChange={() => toggle('tekanan')}
                className="accent-primary"
              />
              Ada tekanan psikis atau kondisi khusus
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
