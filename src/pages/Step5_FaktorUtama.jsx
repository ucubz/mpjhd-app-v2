import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  hitungNilaiPokokIIIKhususIndividual,
  hitungNilaiPokokIIIKhususBersama,
  hitungNilaiPokokIV,
  hitungNilaiPokokVI
} from '../utils_v2/hitungNilaiPokok'

const peranOptions = [
  { label: 'Utama', value: 'utama' },
  { label: 'Penyerta', value: 'penyerta' }
]

export default function Step5_FaktorUtama() {
  const { state, dispatch } = useMPJHD()
  const navigate = useNavigate()
  const [inputKerugian, setInputKerugian] = useState('')
  const [selectedPeran, setSelectedPeran] = useState(null)

  useEffect(() => {
    if (
      state.kelompok === 'II' ||
      state.kelompok === 'III Umum' ||
      state.kelompok === 'V'
    ) {
      navigate('/step/6')
    }
  }, [state.kelompok, navigate])

  const handleSubmit = () => {
    if (state.kelompok === 'III Khusus Bersama') {
      if (!selectedPeran || !inputKerugian) {
        alert('Silakan isi peran dan jumlah kerugian.')
        return
      }
    } else {
      if (!inputKerugian) {
        alert('Silakan isi jumlah kerugian atau faktor utama.')
        return
      }
    }

    if (state.kelompok === 'III Khusus Individual') {
      const faktorUtama = hitungNilaiPokokIIIKhususIndividual(parseInt(inputKerugian))
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama })
    }

    if (state.kelompok === 'III Khusus Bersama') {
      const faktorUtama = hitungNilaiPokokIIIKhususBersama(parseInt(inputKerugian), selectedPeran.value)
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama })
    }

    if (state.kelompok === 'IV') {
      const faktorUtama = hitungNilaiPokokIV(parseInt(inputKerugian))
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama })
    }

    if (state.kelompok === 'VI') {
      const faktorUtama = hitungNilaiPokokVI(state.dampak)
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama })
    }

    navigate('/step/6')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Faktor Utama
      </h1>

      <Card>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Jumlah Kerugian (dalam angka)</label>
            <input
              type="number"
              value={inputKerugian}
              onChange={(e) => setInputKerugian(e.target.value)}
              className="w-full rounded-md bg-white/10 px-3 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {state.kelompok === 'III Khusus Bersama' && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Pilih Peran Pelaku</label>
              <RadioGroup value={selectedPeran} onChange={setSelectedPeran}>
                {peranOptions.map((opt) => (
                  <RadioGroup.Option key={opt.value} value={opt} className={({ active, checked }) =>
                    `
                    ${active ? 'ring-2 ring-primary' : ''}
                    ${checked ? 'bg-primary text-white' : 'bg-white/10'}
                    group flex cursor-pointer rounded-lg px-3 py-2 shadow-md transition mb-2
                    `
                  }>
                    {({ checked }) => (
                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-medium">{opt.label}</p>
                        {checked && <CheckCircleIcon className="h-6 w-6 text-white" />}
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </Card>

      <Button onClick={handleSubmit} className="mt-8">
        Lanjut
      </Button>

      <Stepper currentStep={5} />
    </PageWrapper>
  )
}