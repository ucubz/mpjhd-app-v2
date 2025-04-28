import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import Stepper from '../components/Stepper'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const optionsBanyakPasal = [
  { label: 'Satu', value: 'satu' },
  { label: 'Dua', value: 'dua' },
  { label: 'Lebih dari Dua', value: 'lebihDariDua' }
]

const optionsHukdis = [
  { label: 'Belum Pernah', value: 'belumPernah' },
  { label: 'Pernah 1x', value: 'pernah1x' },
  { label: 'Pernah >1x', value: 'pernahLebih1x' }
]

const optionsKesengajaan = [
  { label: 'Terpaksa', value: 'terpaksa' },
  { label: 'Sengaja', value: 'sengaja' }
]

const optionsHambatan = [
  { label: 'Ada Hambatan', value: 'adaHambatan' },
  { label: 'Tidak Ada Hambatan', value: 'tidakAdaHambatan' }
]

export default function Step6_FaktorPembobotan() {
  const { state, dispatch } = useMPJHD()
  const { faktorPembobotan } = state
  const navigate = useNavigate()

  const handleChange = (key, selected) => {
    dispatch({
      type: 'SET_FAKTOR_PEMBOBOTAN',
      payload: { key, value: selected.value }
    })
  }

  const renderListbox = (label, options, value, onChange) => (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold">{label}</h2>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full rounded-md bg-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-primary text-sm">
            <span className="block truncate">{value?.label || 'Pilih'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/10 py-1 text-sm shadow-lg focus:outline-none">
            {options.map((option) => (
              <Listbox.Option key={option.value} value={option} className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-primary text-white' : 'text-gray-200'
                }`
              }>
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )

  const handleNext = () => {
    navigate('/step/7')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Faktor Pembobotan
      </h1>

      <Card>
        <div className="space-y-6">
          {renderListbox(
            'Banyaknya Pasal',
            optionsBanyakPasal,
            optionsBanyakPasal.find((o) => o.value === faktorPembobotan.banyakPasal),
            (val) => handleChange('banyakPasal', val)
          )}
          {renderListbox(
            'Riwayat Hukuman Disiplin',
            optionsHukdis,
            optionsHukdis.find((o) => o.value === faktorPembobotan.hukdis),
            (val) => handleChange('hukdis', val)
          )}
          {renderListbox(
            'Kesengajaan Pelanggaran',
            optionsKesengajaan,
            optionsKesengajaan.find((o) => o.value === faktorPembobotan.kesengajaan),
            (val) => handleChange('kesengajaan', val)
          )}
          {renderListbox(
            'Hambatan Pemeriksaan',
            optionsHambatan,
            optionsHambatan.find((o) => o.value === faktorPembobotan.hambatan),
            (val) => handleChange('hambatan', val)
          )}
        </div>
      </Card>

      <Button onClick={handleNext} className="mt-8">
        Lanjut
      </Button>

      <Stepper currentStep={6} />
    </PageWrapper>
  )
}