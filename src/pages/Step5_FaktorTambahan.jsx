import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';
import useRequireStep from '../hooks/useRequireStep';
import StepLayout from '../components/StepLayout';
import OptionList from '../components/OptionList';
import { formatNilai } from '../utils_v2/formatNilai';
import { nilaiMap, getAvailableOptions, faktorYangDipakai } from '../utils_v2/hitungFaktorTambahan';
import { kunciKelompokAktif } from '../utils_v2/hitungNilaiAkhir';
import { KERUGIAN_OPTIONS, NILAI_KERUGIAN_BERSAMA } from '../utils_v2/opsiFaktor';

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

const judul = {
  banyakPasal: 'Banyaknya jenis pelanggaran',
  hukdis: 'Riwayat hukuman disiplin',
  kesengajaan: 'Faktor kesengajaan',
  hambatan: 'Hambatan pemeriksaan',
};

export default function Step5_FaktorTambahan() {
  useRequireStep(['kelompok'], '/step/1');

  const { state, dispatch } = useMPJHD();
  const navigate = useNavigate();
  const faktor = state.faktorPembobotan;
  const isBersama = state.kelompok === 'III' && state.tipeKelompokIII === 'bersama';

  const kelompokAktif = kunciKelompokAktif(state);
  const faktorDipakai = faktorYangDipakai(kelompokAktif);

  const isComplete = isBersama
    ? Boolean(faktor.jumlahKerugian)
    : faktorDipakai.every((k) => faktor[k] !== null && faktor[k] !== undefined && faktor[k] !== '');

  const update = (field) => (value) => dispatch({ type: 'SET_FAKTOR_PEMBOBOTAN', field, value });

  const opsiFaktor = (f) =>
    getAvailableOptions(options[f], kelompokAktif).map((o) => {
      const nilai = nilaiMap[kelompokAktif]?.[o.value] ?? 0;
      const label =
        kelompokAktif === 'III_UMUM' && o.value === 'pernahSatu'
          ? 'Pernah dijatuhi hukuman disiplin (satu kali atau lebih)'
          : o.label;
      return { value: o.value, label, hint: nilai ? `+${formatNilai(nilai)}` : '0' };
    });

  return (
    <StepLayout
      step={5}
      title="Faktor Pembobotan Tambahan"
      subtitle="Pilih satu jawaban pada setiap pertanyaan, lalu tekan Lanjut."
      onNext={() => navigate('/step/6')}
      nextDisabled={!isComplete}
    >
      {faktorDipakai.map((f) => (
        <div key={f} className="mb-6">
          <p className="mb-2 font-semibold">{judul[f]}</p>
          <OptionList value={faktor[f] || null} onChange={update(f)} options={opsiFaktor(f)} label={judul[f]} />
        </div>
      ))}

      {isBersama && (
        <div className="mb-2">
          <p className="mb-2 font-semibold">Jumlah uang yang diterima atau kerugian negara/pihak lain:</p>
          <OptionList
            value={faktor.jumlahKerugian || null}
            onChange={update('jumlahKerugian')}
            options={KERUGIAN_OPTIONS.map((o) => ({
              value: o.value,
              label: o.label,
              hint: `+${formatNilai(NILAI_KERUGIAN_BERSAMA[o.value])}`,
            }))}
            label="Jumlah kerugian"
          />
        </div>
      )}
    </StepLayout>
  );
}
