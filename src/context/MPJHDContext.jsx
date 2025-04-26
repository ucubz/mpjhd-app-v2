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
  faktorUtama: {
    // Contoh isian: { "berdampak_instansi": true, "berdampak_negara": false }
  },
  faktorPembobotan: {
    banyakPasal: '',          // satu / dua / lebihDua
    hukdis: '',               // belumPernah / pernah1x / lebih1x
    kesengajaan: '',          // terpaksa / lalai / sengaja
    hambatan: '',             // tidakAda / tidakKooperatif / menghalangi
    meringankan: '',          // tidakAda / kooperatif / inisiator
  },
  faktorMeringankan: {
    kooperatif: false,       // Bersikap kooperatif
    mengakui: false,         // Mengakui perbuatan
    menyesal: false,         // Menunjukkan penyesalan
    tekanan: false,          // Melakukan dalam tekanan
  },
  nilaiPokok: 0,             // Nilai dasar sesuai kelompok
  pembobotanTambahan: 0,     // Tambahan nilai dari faktor pembobotan
  pengurangMeringankan: 0,   // Pengurang nilai dari faktor meringankan
  nilaiAkhir: 0,             // Nilai final setelah semua faktor
  grade: '',                 // Grade hasil perhitungan
  jenisHukuman: '',          // Output jenis hukuman
};

// Reducer
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

// Hook
export const useMPJHD = () => useContext(MPJHDContext);
