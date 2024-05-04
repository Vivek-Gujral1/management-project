import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  selectedCheckbox: string | null;
}

const CheckboxPage: React.FC = () => {
  const { register, watch } = useForm<FormData>();
  const selectedCheckbox = watch('selectedCheckbox');

  return (
    <form className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Choose One Checkbox</h1>
      <label className="inline-flex items-center mb-2">
        <input
          type="checkbox"
          {...register('selectedCheckbox')}
          value="option1"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={selectedCheckbox === 'option1'}
        />
        <span className="ml-2">Option 1</span>
      </label>
      <label className="inline-flex items-center mb-2">
        <input
          type="checkbox"
          {...register('selectedCheckbox')}
          value="option2"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={selectedCheckbox === 'option2'}
        />
        <span className="ml-2">Option 2</span>
      </label>
      <label className="inline-flex items-center mb-2">
        <input
          type="checkbox"
          {...register('selectedCheckbox')}
          value="option3"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={selectedCheckbox === 'option3'}
        />
        <span className="ml-2">Option 3</span>
      </label>
      {/* Add more checkboxes as needed */}
    </form>
  );
};

export default CheckboxPage;
