import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { useMPJHD } from '../context/MPJHDContext';
import { tentukanNilaiPokok } from '../utils/tentukanNilaiPokok';

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function Step4_PertanyaanTambahan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [dampak, setDampak] = useState(state.dampak || '');
  const [jabatan, setJabatan] = useState(state.jabatan || '');

  const perluTanyaJabatan = state.pasalUtama?.includes('Pasal 4 huruf e');
  const tampilkanInputJabatan = perluTanyaJabatan || state.kelompok === 'V';

  const nilaiPokok = tentukanNilaiPokok({
    pasal: state.pasalUtama,
    kelompok: state.kelompok,
    dampak,
    jabatan,
    tipeKelompokIII: state.tipeKelompokIII
  });

  const dampakOptions = ['Unit Kerja', 'Instansi', 'Negara'];
  const jabatanOptions = ['Pejabat Administrator', 'Pejabat Pimpinan Tinggi'];

  const handleNext = () => {
    dispatch({ type: 'SET', key: 'dampak', value: dampak });

    if (perluTanyaJabatan || state.kelompok === 'V') {
      dispatch({ type: 'SET', key: 'jabatan', value: jabatan });
    }

    if (
      state.kelompok !== 'III Khusus Individual' &&
      state.kelompok !== 'III Khusus Bersama'
    ) {
      dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokok });
    }

    navigate('/step/5');
  };

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold mb-8 md:text-3xl">
        Pertanyaan Tambahan
      </h1>

      <Card className="flex flex-col gap-6 p-6">
        <div className="space-y-6">

          {/* Pilih Dampak pakai RadioGroup */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Dampak pelanggaran terhadap:
            </label>
            <RadioGroup value={dampak} onChange={setDampak}>
              <div className="flex flex-col gap-2 mt-2">
                {dampakOptions.map((item) => (
                  <RadioGroup.Option
                    key={item}
                    value={item}
                    className={({ checked }) =>
                      `cursor-pointer p-3 rounded-md border text-sm ${
                        checked
                          ? 'bg-primary text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                      }`
                    }
                  >
                    {item}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Pilih Jabatan kalau perlu */}
          {tampilkanInputJabatan && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Jenis Jabatan:
              </label>
              <RadioGroup value={jabatan} onChange={setJabatan}>
                <div className="flex flex-col gap-2 mt-2">
                  {jabatanOptions.map((item) => (
                    <RadioGroup.Option
                      key={item}
                      value={item}
                      className={({ checked }) =>
                        `cursor-pointer p-3 rounded-md border text-sm ${
                          checked
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                        }`
                      }
                    >
                      {item}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Rekap Visual */}
          {(dampak && (!tampilkanInputJabatan || jabatan)) && (
            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <p><strong>Rekap Input:</strong></p>
              <p>• Pasal Utama: {state.pasalUtama || '-'}</p>
              <p>• Kelompok: {state.kelompok || '-'}</p>
              <p>• Dampak: {dampak}</p>
              {tampilkanInputJabatan && <p>• Jabatan: {jabatan}</p>}
              <p>• Nilai Pokok (preview): {nilaiPokok}</p>
            </div>
          )}

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton />
            <Button
              onClick={handleNext}
              disabled={!dampak || (tampilkanInputJabatan && !jabatan)}
            >
              Lanjut
            </Button>
          </div>

        </div>
      </Card>

      <Stepper currentStep={4} />
    </PageWrapper>
  );
}
