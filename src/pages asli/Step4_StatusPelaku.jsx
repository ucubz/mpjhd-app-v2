import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import SelectBox from '../components/SelectBox'
import Stepper from '../components/Stepper'

const Step4_StatusPelaku = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [status, setStatus] = useState(state.status || 'sendiri')
  const [peran, setPeran] = useState(state.peran || '')

  const handleNext = () => {
    dispatch({ type: 'SET', key: 'status', value: status })
    dispatch({ type: 'SET', key: 'peran', value: status === 'bersama' ? peran : '' })
    navigate('/step/5')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Status Pelaku
      </h1>

      <Card>
        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="sendiri"
                checked={status === 'sendiri'}
                onChange={(e) => setStatus(e.target.value)}
                className="accent-primary"
              />
              Pelanggaran dilakukan sendiri
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="bersama"
                checked={status === 'bersama'}
                onChange={(e) => setStatus(e.target.value)}
                className="accent-primary"
              />
              Pelanggaran dilakukan bersama-sama
            </label>
          </div>

          {status === 'bersama' && (
            <SelectBox
              label="Pilih Peran"
              value={peran}
              onChange={(e) => setPeran(e.target.value)}
              options={[
                { value: 'utama', label: 'Pelaku Utama' },
                { value: 'penyerta', label: 'Pelaku Penyerta' },
                { value: 'inisiator', label: 'Inisiator' },
                { value: 'aktif', label: 'Pelaku Aktif' },
                { value: 'pasif', label: 'Pelaku Pasif' },
              ]}
            />
          )}

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

export default Step4_StatusPelaku
