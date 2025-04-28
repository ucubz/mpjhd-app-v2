import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';
import InputDropdown from '../components/InputDropdown'; // 🔥 Pakai komponen clean
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';

export default function Step6_FaktorPembobotan() {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();

  const pembobotan = state.faktorPembobotan || {
    banyakPasal: '',
    hukdis: '',
    kesengajaan: '',
    hambatan: '',
    meringankan: '',
  };

  const handleChange = (key, value) => {
    dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', key, value });
  };

  const handleNext = () => {
    navigate('/step/7');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Faktor Pembobotan Tambahan
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          <p className="text-gray-700 dark:text-gray-200 text-center">
            Pilih kondisi faktor pembobotan berikut:
          </p>

          <div className="flex flex-col gap-4">

            {/* Banyaknya Pasal */}
            <InputDropdown
              label="Banyaknya Pasal:"
              value={pembobotan.banyakPasal}
              onChange={(val) => handleChange('banyakPasal', val)}
              options={[
                { value: 'satu', label: 'Hanya satu pasal dilanggar' },
                { value: 'dua', label: 'Terdapat dua pasal dilanggar' },
                { value: 'lebihDua', label: 'Lebih dari dua pasal dilanggar' },
              ]}
            />

            {/* Riwayat Hukuman Disiplin */}
            <InputDropdown
              label="Riwayat Hukuman Disiplin:"
              value={pembobotan.hukdis}
              onChange={(val) => handleChange('hukdis', val)}
              options={[
                { value: 'belumPernah', label: 'Belum pernah dijatuhi hukdis' },
                { value: 'pernah1x', label: 'Pernah 1 kali dijatuhi hukdis' },
                { value: 'lebih1x', label: 'Pernah lebih dari 1 kali dijatuhi hukdis' },
              ]}
            />

            {/* Kesengajaan Pelanggaran */}
            <InputDropdown
              label="Kesengajaan Pelanggaran:"
              value={pembobotan.kesengajaan}
              onChange={(val) => handleChange('kesengajaan', val)}
              options={[
                { value: 'terpaksa', label: 'Terpaksa melakukan pelanggaran' },
                { value: 'lalai', label: 'Tidak sengaja/lalai' },
                { value: 'sengaja', label: 'Sengaja melakukan pelanggaran' },
              ]}
            />

            {/* Hambatan Pemeriksaan */}
            <InputDropdown
              label="Hambatan Pemeriksaan:"
              value={pembobotan.hambatan}
              onChange={(val) => handleChange('hambatan', val)}
              options={[
                { value: 'tidakAda', label: 'Tidak ada hambatan' },
                { value: 'tidakKooperatif', label: 'Bersikap tidak kooperatif' },
                { value: 'menghalangi', label: 'Menghalangi/menghilangkan bukti' },
              ]}
            />

            {/* Faktor Meringankan */}
            <InputDropdown
              label="Faktor Meringankan:"
              value={pembobotan.meringankan}
              onChange={(val) => handleChange('meringankan', val)}
              options={[
                { value: 'tidakAda', label: 'Tidak ada faktor meringankan' },
                { value: 'kooperatif', label: 'Berperilaku baik/kooperatif' },
                { value: 'inisiator', label: 'Inisiator pengungkapan' },
              ]}
            />

          </div>

          {/* Tombol Navigasi */}
          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>

        </div>
      </Card>

      <Stepper currentStep={6} />
    </PageWrapper>
  );
}
