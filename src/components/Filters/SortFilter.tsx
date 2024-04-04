import Dropdown from "./Dropdown";

type Props = {
  onSelect: (value: string) => void;
};

const SortFilter: React.FC<Props> = ({ onSelect }) => {
  return (
    <Dropdown
      options={[
        { value: "", label: "Sort by", disabled: true },
        { value: "nameAsc", label: "Name asc" },
        { value: "nameDesc", label: "Name desc" },
        { value: "heightAsc", label: "Height asc" },
        { value: "heightDesc", label: "Height desc" },
        { value: "weightAsc", label: "Weight asc" },
        { value: "weightDesc", label: "Weight desc" },
      ]}
      onSelect={onSelect}
      defaultValue=""
    />
  );
};

export default SortFilter;
