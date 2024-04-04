import { useEffect } from "react";
import Dropdown from "./Dropdown";

type Props = {
  pokemon: any[];
  setPokemon: Function;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortByAsc: boolean;
  setSortByAsc: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortFilter: React.FC<Props> = ({
  pokemon,
  setPokemon,
  sortBy,
  setSortBy,
  sortByAsc,
  setSortByAsc,
}) => {
  // Sort by name/height/weight
  const sortPokemon = () => {
    const sortedPokemon = [...pokemon].sort((a, b) => {
      if (sortBy === "name") {
        return sortByAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "height") {
        return sortByAsc ? a.height - b.height : b.height - a.height;
      } else if (sortBy === "weight") {
        return sortByAsc ? a.weight - b.weight : b.weight - a.weight;
      }
      return 0;
    });
    setPokemon(sortedPokemon);
  };

  useEffect(() => {
    sortPokemon();
  }, [sortBy, sortByAsc]);

  return (
    <Dropdown
      id="sortByDropdown"
      name="sortByDropdown"
      options={[
        { value: "", label: "Sort by", disabled: true },
        { value: "nameAsc", label: "Name asc" },
        { value: "nameDesc", label: "Name desc" },
        { value: "heightAsc", label: "Height asc" },
        { value: "heightDesc", label: "Height desc" },
        { value: "weightAsc", label: "Weight asc" },
        { value: "weightDesc", label: "Weight desc" },
      ]}
      onSelect={(value) => {
        if (value === "nameAsc" || value === "nameDesc") {
          setSortBy("name");
          setSortByAsc(value === "nameAsc");
          sortPokemon();
        } else if (value === "heightAsc" || value === "heightDesc") {
          setSortBy("height");
          setSortByAsc(value === "heightAsc");
        } else if (value === "weightAsc" || value === "weightDesc") {
          setSortBy("weight");
          setSortByAsc(value === "weightAsc");
        } else {
          setSortBy("");
        }
      }}
      defaultValue=""
    />
  );
};

export default SortFilter;
