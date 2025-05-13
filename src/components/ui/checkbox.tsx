import React from 'react';

type CheckboxProps = {
  label?: string;
  name?: string;
  checked: boolean;
  onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?:string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onCheckedChange,
  disabled = false,
  error,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onCheckedChange}
          disabled={disabled}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Checkbox;
