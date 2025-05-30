import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext'
import PageWrapper from '../components/PageWrapper'
import Card from '../components/Card'
import Stepper from '../components/Stepper'
import BackButton from '../components/BackButton'
import ResetButton from '../components/ResetButton'

// --- CUSTOM HOOK: cek state step sebelumnya ---
function useRequireStep(requiredFields = [], redirectTo = '/step/1') {
  const { state } = useMPJHD();
  const resetMPJHD = useResetMPJHD();
  const navigate = useNavigate();

  useEffect(() => {
    const missing = requiredFields.some((field) => !state[field]);
    if (missing) {
      resetMPJHD();
      navigate(redirectTo, { replace: true });
    }
  }, [state, requiredFields, navigate, redirectTo, resetMPJHD]);
}

// --- END CUSTOM HOOK ---

export default function Step4_FaktorUtama() {
  useRequireStep(['kelompok'], '/step/1');


  const { state, dispatch } = useMPJHD()
  const navigate = useNavigate()
  const kelompok = state.kelompok
  const tipe = state.tipeKelompokIII
  const faktor = state.faktorUtama

  const isKelompokIII = kelompok === 'III'
  const isIV = kelompok === 'IV'

  const showPemecah = isKelompokIII && !tipe
  const showPeran = isKelompokIII && tipe === 'bersama'
  const showKerugian =
    (isKelompokIII && tipe === 'individu') || isIV

  const updateFaktor = (field, value) => {
    let nilai = 0

    if (field === 'peran') {
      const v = value.toLowerCase()
      if (v === 'pasif') nilai = 5
      if (v === 'aktif') nilai = 10
      if (v === 'inisiator') nilai = 15
      dispatch({ type: 'SET_FAKTOR_UTAMA', field, value: v })
    }

    if (field === 'jumlahKerugian') {
      if (tipe === 'individu' || isIV) {
        if (value === '< 1 juta') nilai = 7.5
        if (value === '1 - 10 juta') nilai = 15
        if (value === '> 10 juta') nilai = 22.5
        if (value === '> 100 juta') nilai = 30
      }
      dispatch({ type: 'SET_FAKTOR_UTAMA', field, value })
    }

    dispatch({ type: 'SET_FAKTOR_UTAMA', field: 'nilai', value: nilai })
  }

  const handlePilihTipe = (val) => {
    dispatch({ type: 'SET', field: 'tipeKelompokIII', value: val })
  }

  const handleNext = () => navigate('/step/5')

  const isComplete =
    (!showPemecah || tipe) &&
    (!showPeran || faktor.peran) &&
    (!showKerugian || faktor.jumlahKerugian)

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 3" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Faktor Pembobotan Utama</h2>

        {/* Pertanyaan pemecah untuk Kelompok III */}
        {showPemecah && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Apakah pelanggaran dilakukan:</p>
            <RadioGroup value={tipe || ''} onChange={handlePilihTipe}>
              <div className="space-y-2">
                <RadioGroup.Option value="bersama" className={({ checked }) =>
                  `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>Bersama-sama</span>
                    </div>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="individu" className={({ checked }) =>
                  `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                }>
                  {({ checked }) => (
                    <div className="flex items-center gap-2">
                      {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                      <span>Secara Individu</span>
                    </div>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Pertanyaan Peran: hanya untuk III bersama */}
        {showPeran && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Peran Pelaku:</p>
            <RadioGroup
              value={faktor.peran || ''}
              onChange={(val) => updateFaktor('peran', val)}
            >
              <div className="space-y-2">
                {['Pasif', 'Aktif', 'Inisiator'].map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{val}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Pertanyaan jumlah kerugian: hanya untuk III individu dan IV */}
        {showKerugian && (
          <div className="mb-6">
            <p className="font-semibold mb-2">
              {isIV
                ? 'Kerugian bagi pihak yang dilayani:'
                : 'Jumlah uang yang diterima atau kerugian negara/pihak lain:'}
            </p>
            <RadioGroup
              value={faktor.jumlahKerugian || ''}
              onChange={(val) => updateFaktor('jumlahKerugian', val)}
            >
              <div className="space-y-2">
                {['< 1 juta', '1 - 10 juta', '> 10 juta', '> 100 juta'].map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
                    className={({ checked }) =>
                      `p-3 border rounded-xl ${checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>{val}</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            isComplete
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          Lanjut
        </button>

        <div className="mt-12">
          <Stepper currentStep={4} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  )
}
