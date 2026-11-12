// src/components/Stepper.jsx
import { useNavigate } from 'react-router-dom';
import { useMPJHD } from '../context/MPJHDContext';

/** Halaman yang benar-benar dilalui untuk state saat ini (alur berbeda per kelompok). */
export function jalurLangkah(state) {
  const k = state.kelompok;
  if (k === 'I') return [1, 2, 6, 7];
  if (k === 'IV') return [1, 2, 4, 5, 6, 7];
  if (k === 'VI') return [1, 3, 5, 6, 7];
  if (k === 'III') {
    return state.adaKerugian === true ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 5, 6, 7];
  }
  return [1, 2, 3, 5, 6, 7]; // II, V, dan sebelum pasal dipilih
}

export default function Stepper({ step }) {
  const navigate = useNavigate();
  const { state } = useMPJHD();
  const jalur = jalurLangkah(state);
  const posisi = Math.max(jalur.indexOf(step), 0);

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-2.5" role="list">
        {jalur.map((s, i) => {
          const aktif = i <= posisi;
          const bisaKlik = i < posisi;
          return (
            <button
              key={s}
              type="button"
              role="listitem"
              disabled={!bisaKlik}
              onClick={() => navigate(`/step/${s}`)}
              aria-label={`Langkah ${i + 1} dari ${jalur.length}`}
              aria-current={i === posisi ? 'step' : undefined}
              className={[
                'h-3 w-3 rounded-full transition-all',
                i === posisi ? 'scale-125' : '',
                aktif ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600',
                bisaKlik ? 'cursor-pointer hover:scale-125' : 'cursor-default',
              ].join(' ')}
            />
          );
        })}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Langkah {posisi + 1} dari {jalur.length}
      </p>
    </div>
  );
}
