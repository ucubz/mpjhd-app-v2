import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMPJHD } from '../context/MPJHDContext'

const options = [
  {
    label: 'Kewajiban',
    description: 'Pasal 3',
    kategori: 'KEWAJIBAN',
    pasalGroup: '3'
  },
  {
    label: 'Larangan',
    description: 'Pasal 4',
    kategori: 'LARANGAN',
    pasalGroup: '4'
  },
  {
    label: 'Larangan',
    description: 'Pasal 5',
    kategori: 'LARANGAN',
    pasalGroup: '5'
  }
]

export default function Step1_PilihKategori() {
  const navigate = useNavigate()
  const { dispatch } = useMPJHD()
  const [selected, setSelected] = useState(null)

  const handleNext = () => {
    if (!selected) {
      alert('Silakan pilih kategori dan pasal terlebih dahulu.')
      return
    }
    // Simpan kategori dan pasalGroup ke context
    dispatch({ type: 'SET', key: 'kategori', value: selected.kategori })
    dispatch({ type: 'SET', key: 'pasalGroup', value: selected.pasalGroup })
    navigate('/step/2')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pilih Kategori dan Pasal Utama
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
        <RadioGroup
  value={selected}
  onChange={(value) => {
  if (!value) return
  setSelected(value)
  dispatch({ type: 'SET', key: 'kategori', value: value.kategori })
  dispatch({ type: 'SET', key: 'pasalGroup', value: value.pasalGroup })
  setTimeout(() => {
    navigate('/step/2')
  }, 200) // kasih jeda 200ms
}}
  className="space-y-2"
>
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{opt.label}</p>
              <p className="text-xs text-gray-300">{opt.description}</p>
            </div>
            {checked && (
              <CheckCircleIcon className="h-6 w-6 text-white" />
            )}
          </div>
        </div>
      )}
    </RadioGroup.Option>
  ))}
</RadioGroup>


          <div className='flex justify-end'>
            <Button onClick={handleNext} disabled={!selected}>
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={1} />
    </PageWrapper>
  )
}
