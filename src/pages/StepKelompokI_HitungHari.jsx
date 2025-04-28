import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import Stepper from '../components/Stepper'
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { useState } from 'react';
import { Field, Label, Input } from '@headlessui/react';
import clsx from 'clsx';
import BackButton from '../components/BackButton'

export default function StepKelompokI_HitungHari() {
  const { dispatch } = useMPJHD();
  const navigate = useNavigate();
  const [jumlahHari, setJumlahHari] = useState('');

  const handleNext = () => {
    const hari = parseInt(jumlahHari, 10);
    if (isNaN(hari) || hari <= 0) {
      alert('Masukkan jumlah hari tidak masuk kerja yang valid.');
      return;
    }

    let nilaiAkhir = 0;
    if (hari === 3) nilaiAkhir = 10;
    else if (hari >= 4 && hari <= 6) nilaiAkhir = 20;
    else if (hari >= 7 && hari <= 10) nilaiAkhir = 30;
    else if (hari >= 11 && hari <= 13) nilaiAkhir = 40;
    else if (hari >= 14 && hari <= 16) nilaiAkhir = 50;
    else if (hari >= 17 && hari <= 20) nilaiAkhir = 60;
    else if (hari >= 21 && hari <= 24) nilaiAkhir = 70;
    else if (hari >= 25 && hari <= 27) nilaiAkhir = 80;
    else if (hari >= 28) nilaiAkhir = 90;

    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir });

    navigate('/step/hasil-kelompok-i');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8 sm:text-xl md:text-3xl">
        Jumlah Hari Tidak Masuk Kerja
      </h1>

      <Card>
        <div className="flex flex-col gap-6">
          <Field>
            <Label className="text-sm font-medium">
              Masukkan jumlah hari tidak masuk kerja
            </Label>
            <Input
              type="number"
              value={jumlahHari}
              onChange={(e) => setJumlahHari(e.target.value)}
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800'
              )}
              placeholder="Contoh: 5"
            />
          </Field>
        </div>


        <div className="flex justify-between gap-4 mt-6">
          <BackButton className="w-24" />
          <Button onClick={handleNext}  disabled={!jumlahHari}>
            Lanjut
          </Button>
        </div>        
        
      </Card>
    </PageWrapper>
  );
}
