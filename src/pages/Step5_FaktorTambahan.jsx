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
import { hitungFaktorTambahan, nilaiMap, getAvailableOptions } from '../utils_v2/hitungFaktorTambahan';

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

const jumlahKerugianOptions = [
  '< 1 juta',
  '1 - 10 juta',
  '> 10 juta',
  '> 100 juta',
];

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
  const isIndividuOrUmum = isKelompokIII && (tipe === 'individu' || tipe === 'umum');

  const kelompokAktif = isKelompokIII ? `III_${tipe?.toUpperCase()}` : kelompok;

  const showEmpatFaktor = !isKelompokIII || isIndividuOrUmum;
  const showJumlahKerugian = isBersama;

  const isComplete =
    (showEmpatFaktor &&
      ['banyakPasal', 'hukdis', 'kesengajaan', 'hambatan'].every(
        (key) => faktor[key] !== null && faktor[key] !== ''
      )) ||
    (showJumlahKerugian && faktor.jumlahKerugian);

  const updateField = (field, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', field, value });
  };

  const handleNext = () => {
    const nilaiTambahan = hitungFaktorTambahan(faktor, kelompokAktif);
    dispatch({ type: 'SET_NILAI_TAMBAHAN', nilaiTambahan });
    navigate('/step/6');
  };

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <BackButton label="Kembali ke Step 4" />
          <ResetButton />
        </div>

        <h2 className="text-xl font-bold mb-6 text-center">Faktor Pembobotan Tambahan</h2>

        {showEmpatFaktor && (
          <>
            <FancyListbox
              label="Banyaknya jenis pelanggaran"
              field="banyakPasal"
              value={faktor.banyakPasal}
              onChange={updateField}
              list={getAvailableOptions(options.banyakPasal, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            <FancyListbox
              label="Riwayat Hukuman Disiplin"
              field="hukdis"
              value={faktor.hukdis}
              onChange={updateField}
              list={getAvailableOptions(options.hukdis, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            <FancyListbox
              label="Faktor Kesengajaan"
              field="kesengajaan"
              value={faktor.kesengajaan}
              onChange={updateField}
              list={getAvailableOptions(options.kesengajaan, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
            <FancyListbox
              label="Hambatan Pemeriksaan"
              field="hambatan"
              value={faktor.hambatan}
              onChange={updateField}
              list={getAvailableOptions(options.hambatan, kelompokAktif)}
              kelompokAktif={kelompokAktif}
            />
          </>
        )}

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
                {jumlahKerugianOptions.map((val) => (
                  <RadioGroup.Option
                    key={val}
                    value={val}
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
                          {val} (nilai: {nilaiMap['III_BERSAMA']?.[val] ?? 0})
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
