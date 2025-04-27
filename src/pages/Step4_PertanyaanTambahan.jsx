import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { tentukanNilaiPokok } from '../utils/tentukanNilaiPokok';

import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import Stepper from '../components/Stepper';
import BackButton from '../components/BackButton';

export default function Step4_PertanyaanTambahan() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [dampak, setDampak] = useState(state.dampak || '');
  const [jabatan, setJabatan] = useState(state.jabatan || '');

  const perluTanyaJabatan = state.pasalUtama?.includes('Pasal 4 huruf e');

  // Hitung nilai pokok real-time untuk preview (rekap tampilan saja)
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

    // Hanya hitung dan simpan nilai pokok jika BUKAN Kelompok III Khusus
    if (
      state.kelompok !== 'III Khusus Individual' &&
      state.kelompok !== 'III Khusus Bersama'
    ) {
      const nilaiPokokBaru = tentukanNilaiPokok({
        pasal: state.pasalUtama,
        kelompok: state.kelompok,
        dampak: dampak,
        jabatan: jabatan,
        tipeKelompokIII: state.tipeKelompokIII,
      });
      dispatch({ type: 'SET', key: 'nilaiPokok', value: nilaiPokokBaru });
    }

    navigate('/step/5');
  };

  return (
    <PageWrapper className="min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Pertanyaan Tambahan
      </h1>

      <Card className="flex flex-col gap-6 p-4 sm:p-6">
        <div className="text-center">
          {/* Form Input Dampak */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Dampak pelanggaran terhadap:
            </label>
            <select
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              value={dampak}
              onChange={(e) => setDampak(e.target.value)}
            >
              <option value="">-- Pilih Dampak --</option>
              <option value="Unit Kerja">Unit Kerja</option>
              <option value="Instansi">Instansi</option>
              <option value="Negara">Negara</option>
            </select>
          </div>

          {/* Form Input Jabatan (hanya kalau pasal 4 huruf e) */}
          {perluTanyaJabatan && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Jenis Jabatan:
              </label>
              <select
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
              >
                <option value="">-- Pilih Jabatan --</option>
                <option value="Pejabat Administrator">Pejabat Administrator / Fungsional</option>
                <option value="Pejabat Pimpinan Tinggi">Pejabat Pimpinan Tinggi / Lainnya</option>
              </select>
            </div>
          )}

          {/* Visual Rekap */}
          {(dampak && (!perluTanyaJabatan || jabatan)) && (
            <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200 space-y-2">
              <p><strong>Rekap Input:</strong></p>
              <p>• Pasal yang dilanggar: {state.pasalUtama || '-'}</p>
              <p>• Kelompok Pelanggaran: {state.kelompok || '-'}</p>
              <p>• Dampak: {dampak}</p>
              {perluTanyaJabatan && <p>• Jabatan: {jabatan}</p>}
              <p>• Nilai Pokok (preview): {nilaiPokok}</p>
            </div>
          )}

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button
              onClick={handleNext}
              className="flex-1"
              disabled={!dampak}
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
