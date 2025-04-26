// src/pages/Step5_FaktorUtama.jsx

import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

export default function Step5_FaktorUtama() {
  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();

  const [inputUtama, setInputUtama] = useState('');

  const handleSubmit = () => {
    if (!inputUtama) {
      alert('Silakan isi faktor utama terlebih dahulu.');
      return;
    }

    dispatch({ type: 'SET', key: 'faktorUtama', value: inputUtama });
    navigate('/step/6'); // Lanjut ke pembobotan tambahan
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
              value={inputUtama}
              onChange={(e) => setInputUtama(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Masukkan jumlah kerugian"
            />
          </div>
        );

      case 'III Khusus Bersama':
        return (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Pilih Peran Pelaku
            </label>
            <select
              value={inputUtama}
              onChange={(e) => setInputUtama(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Pilih Peran</option>
              <option value="Pasif">Pasif</option>
              <option value="Aktif">Aktif</option>
              <option value="Inisiator">Inisiator</option>
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
              disabled={!inputUtama}
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
