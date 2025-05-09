import { createContext, useContext, useReducer } from 'react';

const initialState = {
  kategori: null,
  pasalUtama: null,
  kelompok: null,
  dampak: null,
  jabatan: null,
  adaKerugian: null,
  tipeKelompokIII: null,
  jumlahHariTidakMasuk: '',
  tipeHariTidakMasuk: '',

  faktorUtama: {
    peran: null,
    jumlahKerugian: '',
    reputasi: null,
    nilai: 0,
  },

  faktorPembobotan: {
    banyakPasal: '',
    hukdis: '',
    kesengajaan: '',
    hambatan: '',
    jumlahKerugian: '',
  },

  faktorMeringankan: {
    kooperatif: false,
    inisiator: false,
  },

  nilaiPokok: 0,
  nilaiTambahan: 0,
  nilaiAkhir: 0,
  grade: '',
  jenisHukuman: '',
  isFinished: false,
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

    case 'SET_JUMLAH_HARI_TIDAK_MASUK':
      return { ...state, jumlahHariTidakMasuk: action.value };
    
    case 'SET_TIPE_HARI_TIDAK_MASUK':
      return { ...state, tipeHariTidakMasuk: action.value };
      
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
