// src/context/MPJHDContext.js
import { createContext, useContext, useReducer } from 'react';

// Initial State
const initialState = {
  kategori: '',             // KEWAJIBAN / LARANGAN
  pasalUtama: '',            // Pasal utama yang dipilih
  kelompok: '',              // Kelompok otomatis berdasarkan pasal
  dampak: '',                // Unit Kerja / Instansi / Negara
  riwayatHukdis: '',         // Ada / Tidak Ada
  motifKeuntungan: '',       // Ada / Tidak Ada
  peranPelaku: '',           // Utama / Penyerta / Inisiator / Aktif / Pasif
  adaKerugian: false,        // True / False
  jumlahKerugian: 0,         // Angka nominal kerugian
  faktorUtama: {},
  faktorPembobotan: {
    banyakPasal: '',
    hukdis: '',
    kesengajaan: '',
    hambatan: '',
    meringankan: '',
  },
  faktorMeringankan: {
    kooperatif: false,
    mengakui: false,
    menyesal: false,
    tekanan: false,
  },
  nilaiPokok: 0,
  pembobotanTambahan: 0,
  pengurangMeringankan: 0,
  nilaiAkhir: 0,
  grade: '',
  jenisHukuman: '',
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.key]: action.value };
      
    case 'SET_FAKTOR_UTAMA':
      return { 
        ...state, 
        faktorUtama: { 
          ...state.faktorUtama, 
          [action.key]: action.value 
        } 
      };

    case 'SET_FAKTOR_PEMBOBOTAN':
      return { 
        ...state, 
        faktorPembobotan: { 
          ...state.faktorPembobotan, 
          [action.key]: action.value 
        } 
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Context
const MPJHDContext = createContext();

// Provider
export const MPJHDProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MPJHDContext.Provider value={{ state, dispatch }}>
      {children}
    </MPJHDContext.Provider>
  );
};

// Hooks
export const useMPJHD = () => useContext(MPJHDContext);

// Optional: Helper untuk reset cepat
export const useResetMPJHD = () => {
  const { dispatch } = useContext(MPJHDContext);
  return () => dispatch({ type: 'RESET' });
};
