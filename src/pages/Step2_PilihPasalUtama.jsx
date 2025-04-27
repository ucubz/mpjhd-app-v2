import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Button from '../components/Button'
import Stepper from '../components/Stepper'
import BackButton from '../components/BackButton'
import { useNavigate } from 'react-router-dom'
import { useMPJHD } from '../context/MPJHDContext'
import { useState, useMemo } from 'react'

// Deskripsi lengkap huruf pasal
const pasalOptionsMap = {
  '3': [
    { letter: 'a', description: 'Setia dan taat sepenuhnya kepada Pancasila, UUD 1945, NKRI, dan Pemerintah' },
    { letter: 'b', description: 'Menjaga persatuan dan kesatuan bangsa' },
    { letter: 'c', description: 'Melaksanakan kebijakan yang ditetapkan oleh pejabat pemerintah yang berwenang' },
    { letter: 'd', description: 'Menaati ketentuan peraturan perundang-undangan' },
    { letter: 'e', description: 'Melaksanakan tugas kedinasan dengan penuh pengabdian, kejujuran, kesadaran, dan tanggung jawab' },
    { letter: 'f', description: 'Menunjukkan integritas dan keteladanan dalam sikap, perilaku, ucapan, dan tindakan' },
    { letter: 'g', description: 'Menyimpan rahasia jabatan sesuai ketentuan peraturan perundang-undangan' },
    { letter: 'h', description: 'Bersedia ditempatkan di seluruh wilayah NKRI' }
  ],
  '4': [
    { letter: 'a', description: 'Menghadiri dan mengucapkan sumpah/janji PNS' },
    { letter: 'b', description: 'Menghadiri dan mengucapkan sumpah/janji jabatan' },
    { letter: 'c', description: 'Mengutamakan kepentingan negara daripada kepentingan pribadi/golongan' },
    { letter: 'd', description: 'Melaporkan segera hal yang membahayakan keamanan negara atau merugikan keuangan negara' },
    { letter: 'e', description: 'Melaporkan harta kekayaan kepada pejabat berwenang sesuai peraturan' },
    { letter: 'f', description: 'Masuk kerja dan menaati ketentuan jam kerja' },
    { letter: 'g', description: 'Menggunakan dan memelihara barang milik negara dengan sebaik-baiknya' },
    { letter: 'h', description: 'Memberikan kesempatan bawahan mengembangkan kompetensi' },
    { letter: 'i', description: 'Menolak segala bentuk pemberian terkait tugas/fungsi kecuali penghasilan sesuai peraturan' }
  ],
  '5': [
    { letter: 'a', description: 'Menyalahgunakan wewenang' },
    { letter: 'b', description: 'Menjadi perantara keuntungan pribadi/orang lain dengan konflik kepentingan' },
    { letter: 'c', description: 'Menjadi pegawai atau bekerja untuk negara lain' },
    { letter: 'd', description: 'Bekerja di lembaga/organisasi internasional tanpa izin/penugasan' },
    { letter: 'e', description: 'Bekerja pada perusahaan asing/konsultan/LSM asing tanpa penugasan' },
    { letter: 'f', description: 'Menguasai/menjual/meminjamkan barang milik negara secara tidak sah' },
    { letter: 'g', description: 'Melakukan pungutan di luar ketentuan' },
    { letter: 'h', description: 'Melakukan kegiatan yang merugikan negara' },
    { letter: 'i', description: 'Bertindak sewenang-wenang terhadap bawahan' },
    { letter: 'j', description: 'Menghalangi tugas kedinasan berjalan' },
    { letter: 'k', description: 'Menerima hadiah terkait jabatan/pekerjaan' },
    { letter: 'l', description: 'Meminta sesuatu yang terkait jabatan' },
    { letter: 'm', description: 'Tindakan/non-tindakan yang merugikan pihak dilayani' },
    { letter: 'n', description: 'Memberi dukungan politik kampanye atau atribut calon pejabat' }
  ]
}

export default function Step2_PilihPasalUtama() {
  const navigate = useNavigate()
  const { state, dispatch } = useMPJHD()
  const [selected, setSelected] = useState(null)

  // ambil opsi sesuai pasalGroup dari step1
  const options = pasalOptionsMap[state.pasalGroup] || []

  const handleNext = () => {
    if (!selected) {
      alert('Silakan pilih huruf pasal terlebih dahulu.')
      return
    }
    // gabungkan 'Pasal X huruf Y'
    const fullPasal = `Pasal ${state.pasalGroup} huruf ${selected.letter}`
    dispatch({ type: 'SET', key: 'pasalUtama', value: fullPasal })
    navigate('/step/3')
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pilih {state.kategori} dari Pasal {state.pasalGroup}
      </h1>

      <Card className="flex flex-col gap-6 p-4 sm:p-6">
        <RadioGroup value={selected} onChange={setSelected} className="space-y-2">
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
                      <p className="text-sm font-semibold">Pasal {state.pasalGroup} huruf {opt.letter}</p>
                      <p className="text-xs text-gray-300">{opt.description}</p>
                    </div>
                    {checked && <CheckCircleIcon className="h-6 w-6 text-white" />}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        <div className="flex justify-between gap-4 mt-6">
          <BackButton className="w-24" />
          <Button onClick={handleNext}  disabled={!selected}>
            Lanjut
          </Button>
        </div>
      </Card>

      <Stepper currentStep={2} />
    </PageWrapper>
  )
}
