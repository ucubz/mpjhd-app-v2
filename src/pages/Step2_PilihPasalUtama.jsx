import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState, useEffect, useMemo } from 'react'

// Daftar pasal berdasarkan kategori
const pasalOptionsMap = {
  '3': [
    { letter: 'a', description: 'Setia dan taat sepenuhnya kepada Pancasila, UUD 1945, NKRI, dan Pemerintah' },
    { letter: 'b', description: 'Menjaga persatuan dan kesatuan bangsa' },
    { letter: 'c', description: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat pemerintah yang berwenang' },
    { letter: 'd', description: 'Menaati ketentuan peraturan perundang-undangan' },
    { letter: 'e', description: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kejujuran, kesadaran, dan tanggung jawab' },
    { letter: 'f', description: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan kepada setiap orang baik di dalam maupun di luar kedinasan' },
    { letter: 'g', description: 'Melaksanakan tugas kedinasan sesuai dengan perintah atasan' },
    { letter: 'h', description: 'Memegang rahasia jabatan yang menurut sifatnya atau menurut perintah harus dirahasiakan' },
    { letter: 'i', description: 'Menggunakan dan memelihara barang milik negara dengan sebaik-baiknya' },
    { letter: 'j', description: 'Memberikan kesempatan kepada bawahan untuk mengembangkan kompetensi' },
    { letter: 'k', description: 'Menaati ketentuan kedinasan tentang penggunaan media sosial' },
  ],
  '4': [
    { letter: 'a', description: 'Menyalahgunakan wewenang' },
    { letter: 'b', description: 'Menjadi perantara untuk mendapatkan keuntungan pribadi atau orang lain dengan menggunakan kewenangan jabatan' },
    { letter: 'c', description: 'Tanpa izin pejabat yang berwenang menjadi pegawai atau bekerja untuk negara lain dan/atau lembaga atau organisasi internasional' },
  ],
  '5': [
    { letter: 'a', description: 'Melakukan korupsi, kolusi, dan nepotisme' },
    { letter: 'b', description: 'Melakukan tindakan diskriminatif' },
    { letter: 'c', description: 'Melakukan tindakan merugikan pihak lain' },
    { letter: 'd', description: 'Melakukan penyalahgunaan narkotika, psikotropika, dan zat adiktif lainnya' },
    { letter: 'e', description: 'Melakukan perbuatan tercela' },
    { letter: 'f', description: 'Melakukan pelanggaran sumpah/janji jabatan' },
  ]
}

export default function Step2_PilihPasalUtama() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const { kategori, pasalGroup } = state
  const [selectedOption, setSelectedOption] = useState(null)

  // Kalau kategori IZIN_PERKAWINAN, langsung skip ke Step5
  useEffect(() => {
    if (kategori === 'IZIN_PERKAWINAN') {
      navigate('/step/5')
    }
  }, [kategori, navigate])

  const options = useMemo(() => {
    return pasalOptionsMap[pasalGroup] || []
  }, [pasalGroup])

  const handleSelect = (value) => {
    if (!value) return

    setSelectedOption(value)

    dispatch({ 
      type: 'SET', 
      key: 'pasalUtama', 
      value: `Pasal ${pasalGroup} huruf ${value.letter}`
    })

    setTimeout(() => {
      navigate('/step/3')
    }, 400)
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pilih Pasal Utama
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <RadioGroup value={selectedOption} onChange={handleSelect} className="space-y-2">
            {options.map((opt) => (
              <RadioGroup.Option key={opt.letter} value={opt}>
                {({ active, checked }) => (
                  <div
                    className={`
                      ${active ? 'ring-2 ring-primary' : ''}
                      ${checked ? 'bg-primary text-white' : 'bg-white/10'}
                      group relative flex cursor-pointer rounded-lg px-3 py-2 shadow-md transition
                    `}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Huruf {opt.letter}</p>
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
        </div>
      </Card>

      <Stepper currentStep={2} />
    </PageWrapper>
  )
}