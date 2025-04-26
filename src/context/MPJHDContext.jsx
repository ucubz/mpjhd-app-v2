// src/context/MPJHDContext.js
import { createContext, useContext, useReducer } from 'react';

// Initial State
const initialState = {
  kategori: '',
  pasalUtama: '',
  kelompok: '',
  dampak: '',              // Instansi/Unit Kerja/Negara
  peranPelaku: '',          // Utama, Penyerta, Inisiator, Aktif, Pasif
  adaKerugian: false,       // True/False
  jumlahKerugian: 0,        // Angka Rupiah
  faktorUtama: {
    // Contoh isian: { "berdampak_instansi": true, "berdampak_negara": false }
  },
  faktorPembobotan: {
    banyakPasal: false,
    pernahDihukum: false,
    kesengajaan: false,
    hambatPemeriksaan: false,
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
      return { ...state, faktorUtama: { ...state.faktorUtama, [action.key]: action.value } };
    case 'SET_FAKTOR_PEMBOBOTAN':
      return { ...state, faktorPembobotan: { ...state.faktorPembobotan, [action.key]: action.value } };
    case 'SET_FAKTOR_MERINGANKAN':
      return { ...state, faktorMeringankan: { ...state.faktorMeringankan, [action.key]: action.value } };
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

// Hook
export const useMPJHD = () => useContext(MPJHDContext);
