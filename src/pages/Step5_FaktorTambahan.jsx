import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  RadioGroup,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useMPJHD, useResetMPJHD } from '../context/MPJHDContext';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Stepper from '../components/Stepper';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import ResetButton from '../components/ResetButton';
import { nilaiMap, getAvailableOptions, faktorYangDipakai } from '../utils_v2/hitungFaktorTambahan';
import { KERUGIAN_OPTIONS, NILAI_KERUGIAN_BERSAMA } from '../utils_v2/opsiFaktor';

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


const options = {
  banyakPasal: [
    { label: 'Hanya satu pasal yang dilanggar', value: 'satu' },
    { label: 'Terdapat dua pasal yang dilanggar', value: 'dua' },
    { label: 'Lebih dari dua pasal yang dilanggar', value: 'lebihDua' },
  ],
  hukdis: [
    { label: 'Belum pernah dijatuhi hukuman disiplin', value: 'belumPernah' },
    { label: 'Pernah satu kali dijatuhi hukuman', value: 'pernahSatu' },
    { label: 'Lebih dari satu kali dijatuhi hukuman', value: 'lebihSatu' },
  ],
  kesengajaan: [
    { label: 'Terpaksa melakukan pelanggaran', value: 'terpaksa' },
    { label: 'Tidak sengaja/lalai', value: 'lalai' },
    { label: 'Sengaja melakukan pelanggaran', value: 'sengaja' },
  ],
  hambatan: [
    { label: 'Tidak ditemukan hambatan', value: 'tidakAda' },
    { label: 'Tidak kooperatif', value: 'tidakKooperatif' },
    { label: 'Menghalangi pemeriksaan', value: 'menghalangi' },
  ],
};

function FancyListbox({ label, field, value, onChange, list, kelompokAktif }) {
  const selected = list.find((x) => x.value === value) || null;

  return (
    <div className="mb-6">
      <p className="font-semibold mb-2">{label}</p>
      <Listbox value={selected} onChange={(val) => onChange(field, val.value)}>
        <div className="relative">
          <ListboxButton className="relative block w-full rounded-md border border-gray-300 bg-white dark:bg-gray-800 py-2 pl-3 pr-8 text-left text-sm text-gray-900 dark:text-white">
            {selected
              ? `${selected.label} (nilai: ${nilaiMap[kelompokAktif]?.[selected.value] ?? 0})`
              : 'Pilih...'}
            <ChevronDownIcon className="absolute top-2.5 right-2.5 h-5 w-5 text-gray-400" />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md border bg-white dark:bg-gray-800 shadow-lg focus:outline-none">
            {list.map((item) => {
              const nilai = nilaiMap[kelompokAktif]?.[item.value] ?? 0;
              return (
                <ListboxOption
                  key={item.value}
                  value={item}
                  className={({ active, selected }) =>
                    `cursor-pointer px-4 py-2 text-sm ${
                      active
                        ? 'bg-blue-100 text-blue-900'
                        : selected
                        ? 'bg-blue-50'
                        : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2">
                      {selected && <CheckIcon className="h-4 w-4 text-blue-600" />}
                      <span>{`${item.label} (nilai: ${nilai})`}</span>
                    </div>
                  )}
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}

export default function Step5_FaktorTambahan() {
  useRequireStep(['kelompok'], '/step/1');


  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const faktor = state.faktorPembobotan;
  const kelompok = state.kelompok;
  const tipe = state.tipeKelompokIII;

  const isKelompokIII = kelompok === 'III';
  const isBersama = isKelompokIII && tipe === 'bersama';

  const kelompokAktif = isKelompokIII ? `III_${tipe?.toUpperCase()}` : kelompok;

  const faktorDipakai = faktorYangDipakai(kelompokAktif);
  const showFaktor = (f) => faktorDipakai.includes(f);
  const showJumlahKerugian = isBersama;

  const isComplete = isBersama
    ? Boolean(faktor.jumlahKerugian)
    : faktorDipakai.every((key) => faktor[key] !== null && faktor[key] !== undefined && faktor[key] !== '');

  const updateField = (field, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', field, value });
  };

  // Nilai dihitung ulang di Step 7 (hitungNilaiAkhir); halaman ini hanya menyimpan pilihan.
  const handleNext = () => navigate('/step/6');

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 4" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Faktor Pembobotan Tambahan</h2>

        <>
            {showFaktor('banyakPasal') && (
            <FancyListbox
              label="Banyaknya jenis pelanggaran"
              field="banyakPasal"
              value={faktor.banyakPasal}
              onChange={updateField}
              list={getAvailableOptions(options.banyakPasal, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            )}
            {showFaktor('hukdis') && (
            <FancyListbox
              label="Riwayat Hukuman Disiplin"
              field="hukdis"
              value={faktor.hukdis}
              onChange={updateField}
              list={getAvailableOptions(options.hukdis, kelompokAktif).map((o) =>
                kelompokAktif === 'III_UMUM' && o.value === 'pernahSatu'
                  ? { ...o, label: 'Pernah dijatuhi hukuman disiplin (satu kali atau lebih)' }
                  : o
              )}
              kelompokAktif={kelompokAktif}
            />
            )}
            {showFaktor('kesengajaan') && (
            <FancyListbox
              label="Faktor Kesengajaan"
              field="kesengajaan"
              value={faktor.kesengajaan}
              onChange={updateField}
              list={getAvailableOptions(options.kesengajaan, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            )}
            {showFaktor('hambatan') && (
            <FancyListbox
              label="Hambatan Pemeriksaan"
              field="hambatan"
              value={faktor.hambatan}
              onChange={updateField}
              list={getAvailableOptions(options.hambatan, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            )}
          </>

        {showJumlahKerugian && (
          <div className="mb-6">
            <p className="font-semibold mb-2">
              Jumlah uang yang diterima atau kerugian negara/pihak lain:
            </p>
            <RadioGroup
              value={faktor.jumlahKerugian}
              onChange={(val) => updateField('jumlahKerugian', val)}
            >
              <div className="space-y-2">
                {KERUGIAN_OPTIONS.map((opt) => (
                  <RadioGroup.Option
                    key={opt.value}
                    value={opt.value}
                    className={({ checked }) =>
                      `p-3 border rounded-xl cursor-pointer ${
                        checked ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                      }`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center gap-2">
                        {checked && <CheckCircleIcon className="h-5 w-5 text-blue-600" />}
                        <span>
                          {opt.label} (nilai: {NILAI_KERUGIAN_BERSAMA[opt.value]})
                        </span>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )}

        <Button
          onClick={handleNext}
          disabled={!isComplete}
          className="w-full mt-4"
        >
          Lanjut
        </Button>

        <div className="mt-12">
          <Stepper currentStep={5} totalSteps={7} />
        </div>
      </Card>
    </PageWrapper>
  );
}
