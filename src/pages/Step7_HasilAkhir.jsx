// Step 7 - Cek Isi State MPJHD (sementara)
import { useMPJHD } from '../context/MPJHDContext';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';

export default function Step7_HasilAkhir() {
  const { state } = useMPJHD();
  const navigate = useNavigate();

  const renderValue = (val) => {
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (val === null || val === undefined) return '(kosong)';
    if (typeof val === 'object') return JSON.stringify(val);
    return val.toString();
  };

  const renderType = (val) => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-6">Debug: Cek Isi State</h2>

      <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="border px-2 py-1">Nama State</th>
            <th className="border px-2 py-1">Isi</th>
            <th className="border px-2 py-1">Tipe</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map(([key, value]) => (
            <tr key={key}>
              <td className="border px-2 py-1 font-mono">{key}</td>
              <td className="border px-2 py-1">{renderValue(value)}</td>
              <td className="border px-2 py-1 text-gray-500">{renderType(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12">
        <Stepper currentStep={7} totalSteps={7} />
        <button
          onClick={() => navigate('/step/6')}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Kembali ke Step 6
        </button>
      </div>
    </div>
  );
}