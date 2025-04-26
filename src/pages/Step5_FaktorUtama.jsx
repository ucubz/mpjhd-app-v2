import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

import {
  hitungNilaiPokokIIIKhususIndividual,
  hitungNilaiPokokIIIKhususBersama,
  hitungNilaiPokokIV,
  hitungNilaiPokokVI
} from '../utils/hitungNilaiPokok';

export default function Step5_FaktorUtama() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [inputKerugian, setInputKerugian] = useState('');
  const [inputPeran, setInputPeran] = useState('');

  useEffect(() => {
    // Jika kelompok tidak perlu input faktor utama ➔ langsung lompat
    if (
      state.kelompok === 'II' ||
      state.kelompok === 'III Umum' ||
      state.kelompok === 'V'
    ) {
      navigate('/step/6');
    }
  }, [state.kelompok, navigate]);

  const handleSubmit = () => {
    if (state.kelompok === 'III Khusus Bersama') {
      if (!inputPeran || !inputKerugian) {
        alert('Silakan isi peran dan jumlah kerugian.');
        return;
      }
    } else {
      if (!inputKerugian) {
        alert('Silakan isi jumlah kerugian atau faktor utama.');
        return;
      }
    }

    if (state.kelompok === 'III Khusus Individual') {
      const faktorUtama = hitungNilaiPokokIIIKhususIndividual(parseInt(inputKerugian));
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    if (state.kelompok === 'III Khusus Bersama') {
      const faktorPeran = hitungNilaiPokokIIIKhususBersama(inputPeran);
      dispatch({ type: 'SET', key: 'faktorPeran', value: faktorPeran });

      const jumlahKerugian = parseInt(inputKerugian);
      let faktorTambahanUang = 0;
      if (jumlahKerugian <= 10000000) faktorTambahanUang = 2.5;
      else if (jumlahKerugian <= 50000000) faktorTambahanUang = 5;
      else if (jumlahKerugian <= 100000000) faktorTambahanUang = 7.5;
      else faktorTambahanUang = 10;

      dispatch({ type: 'SET', key: 'faktorTambahanUang', value: faktorTambahanUang });
    }

    if (state.kelompok === 'IV') {
      const faktorUtama = hitungNilaiPokokIV(parseInt(inputKerugian));
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    if (state.kelompok === 'VI') {
      const faktorUtama = hitungNilaiPokokVI(inputKerugian);
      dispatch({ type: 'SET', key: 'faktorUtama', value: faktorUtama });
    }

    navigate('/step/6');
  };

  const renderInput = () => {
    switch (state.kelompok) {
      case 'III Khusus Individual':
      case 'IV':
        return (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Jumlah Kerugian (Rp)
            </label>
            <input
              type="number"
              value={inputKerugian}
              onChange={(e) => setInputKerugian(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan jumlah kerugian"
            />
          </div>
        );

      case 'III Khusus Bersama':
        return (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Pilih Peran Pelaku
              </label>
              <select
                value={inputPeran}
                onChange={(e) => setInputPeran(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">-- Pilih Peran --</option>
                <option value="Pasif">Pasif</option>
                <option value="Aktif">Aktif</option>
                <option value="Inisiator">Inisiator</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-200">
                Jumlah Kerugian (Rp)
              </label>
              <input
                type="number"
                value={inputKerugian}
                onChange={(e) => setInputKerugian(e.target.value)}
                className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Masukkan jumlah kerugian"
              />
            </div>
          </div>
        );

      case 'VI':
        return (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Pilih Dampak terhadap Reputasi
            </label>
            <select
              value={inputKerugian}
              onChange={(e) => setInputKerugian(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">-- Pilih Dampak --</option>
              <option value="Tidak Berdampak">Tidak Berdampak</option>
              <option value="Unit Kerja">Unit Kerja</option>
              <option value="Instansi/Tersangka">Instansi / Jadi Tersangka</option>
            </select>
          </div>
        );

      default:
        return (
          <p className="text-red-600 dark:text-red-400">
            Kelompok tidak dikenali. Silakan kembali dan cek pilihan.
          </p>
        );
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Input Faktor Utama
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          {/* Render Input Dinamis */}
          {renderInput()}

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!inputKerugian || (state.kelompok === 'III Khusus Bersama' && !inputPeran)}
            >
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={5} />
    </PageWrapper>
  );
}
