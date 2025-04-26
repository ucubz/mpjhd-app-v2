import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import InputText from '../components/InputText';
import InputDropdown from '../components/InputDropdown';
import InputRadio from '../components/InputRadio';
import InputCheckbox from '../components/InputCheckbox';

export default function Playground() {
  const [textValue, setTextValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold text-center mb-8">
        Playground Komponen Input
      </h1>

      <Card>
        <div className="flex flex-col gap-6">

          {/* Input Text */}
          <InputText
            label="Input Text"
            value={textValue}
            onChange={setTextValue}
            placeholder="Ketik sesuatu..."
          />

          {/* Input Number */}
          <InputText
            label="Input Number"
            type="number"
            value={numberValue}
            onChange={setNumberValue}
            placeholder="Ketik angka..."
          />

          {/* Input Dropdown */}
          <InputDropdown
            label="Input Dropdown"
            value={dropdownValue}
            onChange={setDropdownValue}
            options={[
              { value: 'pilihan1', label: 'Pilihan 1' },
              { value: 'pilihan2', label: 'Pilihan 2' },
              { value: 'pilihan3', label: 'Pilihan 3' },
            ]}
          />

          {/* Input Radio */}
          <InputRadio
            label="Input Radio"
            name="radioGroup"
            value={radioValue}
            onChange={setRadioValue}
            options={[
              { value: 'opsiA', label: 'Opsi A' },
              { value: 'opsiB', label: 'Opsi B' },
              { value: 'opsiC', label: 'Opsi C' },
            ]}
          />

          {/* Input Checkbox */}
          <InputCheckbox
            label="Centang Saya Setuju"
            value={checkboxValue}
            onChange={setCheckboxValue}
          />

          {/* Display nilai semua */}
          <div className="mt-8 p-4 border rounded-md bg-gray-100 dark:bg-gray-700">
            <p className="text-gray-700 dark:text-gray-200"><strong>Text:</strong> {textValue}</p>
            <p className="text-gray-700 dark:text-gray-200"><strong>Number:</strong> {numberValue}</p>
            <p className="text-gray-700 dark:text-gray-200"><strong>Dropdown:</strong> {dropdownValue}</p>
            <p className="text-gray-700 dark:text-gray-200"><strong>Radio:</strong> {radioValue}</p>
            <p className="text-gray-700 dark:text-gray-200"><strong>Checkbox:</strong> {checkboxValue ? 'Dicentang' : 'Belum Dicentang'}</p>
          </div>

        </div>
      </Card>
    </PageWrapper>
  );
}
