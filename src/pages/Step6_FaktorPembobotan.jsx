import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'

export default function Step6_FaktorPembobotan() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()

  const pembobotan = state.pembobotan || {
    banyakPasal: false,
    pernahDihukum: false,
    kesengajaan: false,
    hambatPemeriksaan: false,
  }

  const toggle = (key) => {
    dispatch({ type: 'SET_PEMBOBOTAN', key, value: !pembobotan[key] })
  }

  const handleNext = () => {
    navigate('/step/7')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Pembobotan Tambahan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          <p className="text-gray-700 dark:text-gray-200 text-center">
            Centang faktor pembobotan tambahan berikut jika ada:
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pembobotan.banyakPasal}
                onChange={() => toggle('banyakPasal')}
                className="accent-primary"
              />
              Lebih dari 1 pasal dilanggar
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pembobotan.pernahDihukum}
                onChange={() => toggle('pernahDihukum')}
                className="accent-primary"
              />
              Pernah dijatuhi hukuman disiplin sebelumnya
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pembobotan.kesengajaan}
                onChange={() => toggle('kesengajaan')}
                className="accent-primary"
              />
              Pelanggaran dilakukan dengan unsur kesengajaan
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pembobotan.hambatPemeriksaan}
                onChange={() => toggle('hambatPemeriksaan')}
                className="accent-primary"
              />
              Menghambat proses pemeriksaan
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
