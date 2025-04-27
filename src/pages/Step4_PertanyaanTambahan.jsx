import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { tentukanNilaiPokok } from '../utils_v2/tentukanNilaiPokok'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import Stepper from '../components/Stepper'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const optionsDampak = [
  { label: 'Unit Kerja', value: 'Unit Kerja' },
  { label: 'Instansi', value: 'Instansi' },
  { label: 'Negara', value: 'Negara' }
]

const optionsJabatan = [
  { label: 'Struktural', value: 'Struktural' },
  { label: 'Fungsional', value: 'Fungsional' }
]

export default function Step4_PertanyaanTambahan() {
  const { state, dispatch } = useMPJHD()
  const { kelompok, pasalUtama, tipeKelompokIII } = state
  const navigate = useNavigate()

  const [selectedDampak, setSelectedDampak] = useState(null)
  const [selectedJabatan, setSelectedJabatan] = useState(null)

  const perluPilihJabatan = useMemo(() => {
    return pasalUtama?.includes('Pasal 4 huruf e')
  }, [pasalUtama])

  const handleSubmit = () => {
    if (!selectedDampak) {
      alert('Silakan pilih dampak pelanggaran.')
      return
    }

    if (perluPilihJabatan && !selectedJabatan) {
      alert('Silakan pilih jenis jabatan.')
      return
    }

    const nilaiPokok = tentukanNilaiPokok({
      pasal: pasalUtama,
      kelompok,
      dampak: selectedDampak.value,
      jabatan: selectedJabatan?.value || '',
      tipeKelompokIII
    })

    dispatch({ type: 'SET', key: 'dampak', value: selectedDampak.value })
    if (selectedJabatan) {
      dispatch({ type: 'SET', key: 'jabatan', value: selectedJabatan.value })
    }
    dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok })

    navigate('/step/5')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pertanyaan Tambahan
      </h1>

      <Card>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Pilih Dampak Pelanggaran</h2>
            <RadioGroup value={selectedDampak} onChange={setSelectedDampak}>
              {optionsDampak.map((opt) => (
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

          {perluPilihJabatan && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Pilih Jenis Jabatan</h2>
              <RadioGroup value={selectedJabatan} onChange={setSelectedJabatan}>
                {optionsJabatan.map((opt) => (
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

      <Stepper currentStep={4} />
    </PageWrapper>
  )
}