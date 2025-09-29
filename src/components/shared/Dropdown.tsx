import React, { useState } from "react";

interface DropdownProps {
  options: any[];
  label?: string;
  onSelect: (value: string) => void;
  defaultValue: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  onSelect,
  defaultValue,
}) => {
  const [selected, setSelected] = useState<string>(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="form-group">
      {label && <label className="signup-form-label">{label}</label>}
      <select
        className="signup-form-input"
        value={selected}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
