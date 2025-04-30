import { createContext, useContext, useReducer } from 'react';

const initialState = {
  kategori: '',         // KEWAJIBAN / LARANGAN
  pasalUtama: '',
  kelompok: '',
  dampak: '',           // Unit Kerja / Instansi / Negara
  jabatan: '',          // Untuk pasal 4 huruf e (Kelompok V)
  adaKerugian: false,
  jumlahKerugian: 0,
  tipeKelompokIII: '',  // Umum / Khusus Bersama / Khusus Individual

  faktorUtama: {},

  faktorPembobotan: {
    banyakPasal: '',
    hukdis: '',
    kesengajaan: '',
    hambatan: '',
  },

  faktorMeringankan: {
    kooperatif: false,
    inisiator: false,
  },

  nilaiPokok: 0,
  nilaiAkhir: 0,
  grade: '',
  jenisHukuman: '',
  isFinished: false,     // Untuk proteksi refresh sebelum selesai
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.field]: action.value };

    case 'SET_FAKTOR_UTAMA':
      return {
        ...state,
        faktorUtama: { ...state.faktorUtama, [action.field]: action.value },
      };

    case 'SET_FAKTOR_PEMBOBOTAN':
      return {
        ...state,
        faktorPembobotan: {
          ...state.faktorPembobotan,
          [action.field]: action.value,
        },
      };

    case 'SET_FAKTOR_MERINGANKAN':
      return {
        ...state,
        faktorMeringankan: {
          ...state.faktorMeringankan,
          [action.field]: action.value,
        },
      };

    case 'SET_FINISHED':
      return { ...state, isFinished: action.value };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

const MPJHDContext = createContext();

export function MPJHDProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MPJHDContext.Provider value={{ state, dispatch }}>
      {children}
    </MPJHDContext.Provider>
  );
}

export function useMPJHD() {
  return useContext(MPJHDContext);
}

export function useResetMPJHD() {
  const { dispatch } = useContext(MPJHDContext);
  return () => dispatch({ type: 'RESET' });
}
