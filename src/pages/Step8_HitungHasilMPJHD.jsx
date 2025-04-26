import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import { konversiGrade } from '../utils/mpjhdHelper';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Stepper from '../components/Stepper';

const Step8_HitungHasilMPJHD = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useMPJHD();
  console.log('🛠️ DEBUG STATE di Step8:', JSON.stringify(state, null, 2));

  const nilaiPokok = Number(state.nilaiPokok) || 0;
  const pembobotan = state.faktorPembobotan || {};

  let faktorTambahan = 0;
  if (pembobotan.banyakPasal === 'dua') faktorTambahan += 2.5;
  if (pembobotan.banyakPasal === 'lebihDua') faktorTambahan += 5;

  if (pembobotan.hukdis === 'pernah1x') faktorTambahan += 15;
  if (pembobotan.hukdis === 'lebih1x') faktorTambahan += 15;

  if (pembobotan.kesengajaan === 'lalai') faktorTambahan += 2.5;
  if (pembobotan.kesengajaan === 'sengaja') faktorTambahan += 5;

  if (pembobotan.hambatan === 'tidakKooperatif') faktorTambahan += 2.5;
  if (pembobotan.hambatan === 'menghalangi') faktorTambahan += 5;

  let faktorMeringankan = 0;
  if (pembobotan.meringankan === 'kooperatif') faktorMeringankan = 5;
  if (pembobotan.meringankan === 'inisiator') faktorMeringankan = 10;

  const nilaiAkhir = nilaiPokok + faktorTambahan - faktorMeringankan;
  const { grade, hukuman } = konversiGrade(nilaiAkhir);

  const handleNext = () => {
    dispatch({ type: 'SET', key: 'nilaiAkhir', value: nilaiAkhir });
    dispatch({ type: 'SET', key: 'grade', value: grade });
    dispatch({ type: 'SET', key: 'jenisHukuman', value: hukuman });
    navigate('/step/9');
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Hitung Nilai Akhir MPJHD
      </h1>

      <Card>
        <div className="flex flex-col gap-4 text-center">
          <p><strong>Nilai Pokok:</strong> {nilaiPokok}</p>
          <p><strong>Faktor Tambahan:</strong> {faktorTambahan}</p>
          <p><strong>Faktor Meringankan:</strong> {faktorMeringankan}</p>
          <hr className="my-2" />
          <p className="text-xl font-bold"><strong>Nilai Akhir:</strong> {nilaiAkhir.toFixed(2)}</p>
          <p><strong>Grade Hukuman:</strong> {grade}</p>
          <p><strong>Jenis Hukuman Disiplin:</strong> {hukuman}</p>

          <div className="flex justify-between gap-4 mt-6">
            <BackButton className="flex-1" />
            <Button onClick={handleNext} className="flex-1">
              Lanjut
            </Button>
          </div>
        </div>
      </Card>

      <Stepper currentStep={8} />
    </PageWrapper>
  );
};

export default Step8_HitungHasilMPJHD;
