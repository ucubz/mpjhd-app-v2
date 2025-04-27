import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Hitung nilai pokok preview
  const nilaiPokok = tentukanNilaiPokok({
    pasal: state.pasalUtama,
    kelompok: state.kelompok,
    dampak,
    jabatan,
    tipeKelompokIII: state.tipeKelompokIII
  });

  const handleNext = () => {
    if (!dampak) {
      alert('Silakan pilih dampak pelanggaran.');
      return;
    }

    if (perluTanyaJabatan && !jabatan) {
      alert('Silakan pilih jenis jabatan.');
      return;
    }

    dispatch({ type: 'SET', key: 'dampak', value: dampak });

    if (perluTanyaJabatan) {
      dispatch({ type: 'SET', key: 'jabatan', value: jabatan });
    }

    // Simpan nilai pokok kalau bukan Kelompok III Khusus
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
          {/* Input Dampak */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Dampak pelanggaran terhadap:
            </label>
            <select
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-2 text-sm focus:ring-primary focus:border-primary"
              value={dampak}
              onChange={(e) => setDampak(e.target.value)}
            >
              <option value="">-- Pilih Dampak --</option>
              <option value="Unit Kerja">Unit Kerja</option>
              <option value="Instansi">Instansi</option>
              <option value="Negara">Negara</option>
            </select>
          </div>

          {/* Input Jabatan (khusus Pasal 4 huruf e) */}
          {perluTanyaJabatan && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Jenis Jabatan:
              </label>
              <select
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white p-2 text-sm focus:ring-primary focus:border-primary"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
              >
                <option value="">-- Pilih Jabatan --</option>
                <option value="Pejabat Administrator">Pejabat Administrator / Fungsional</option>
                <option value="Pejabat Pimpinan Tinggi">Pejabat Pimpinan Tinggi / Lainnya</option>
              </select>
            </div>
          )}

          {/* Rekap Visual */}
          {(dampak && (!perluTanyaJabatan || jabatan)) && (
            <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <p><strong>Rekap Input:</strong></p>
              <p>• Pasal Utama: {state.pasalUtama || '-'}</p>
              <p>• Kelompok: {state.kelompok || '-'}</p>
              <p>• Dampak: {dampak}</p>
              {perluTanyaJabatan && <p>• Jabatan: {jabatan}</p>}
              <p>• Nilai Pokok (preview): {nilaiPokok}</p>
            </div>
          )}

          {/* Navigasi Tombol */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <BackButton className="w-full sm:w-auto" />
            <Button
              onClick={handleNext}
              disabled={!dampak || (perluTanyaJabatan && !jabatan)}
              className="w-full sm:w-auto"
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
