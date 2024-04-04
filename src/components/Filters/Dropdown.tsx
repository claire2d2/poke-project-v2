import { useState, useEffect } from "react";

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownProps = {
  id: string;
  name: string;
  options: Option[];
  onSelect: (value: string) => void;
  defaultValue: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  id,
  name,
  options,
  onSelect,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onSelect(newValue);
  };

  return (
    <select
      id={id}
      name={name}
      value={selectedValue}
      onChange={handleSelect}
      className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-full py-3 px-5 text-center font-bold appearance-none cursor-pointer"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled || false}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
