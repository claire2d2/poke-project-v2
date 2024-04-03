import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  setSelectedTypes: (cb: (state: string[]) => string[]) => void;
  setSelectedGenerations: (cb: (state: string[]) => string[]) => void;
};

// Type
type Filter = {
  name: string;
};
type FilterData = {
  results: Array<Filter>;
};

const Sidebar: React.FC<Props> = ({
  search,
  setSearch,
  setSelectedTypes,
  setSelectedGenerations,
}) => {
  const [generation, setGeneration] = useState<Array<Filter>>([]);
  const [type, setType] = useState<Array<Filter>>([]);

  // State for toggle filters
  const [isOpenGeneration, setIsOpenGeneration] = useState<Boolean>(false);
  const [isOpenType, setIsOpenType] = useState<Boolean>(false);

  // Search filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // Generation filter
  const handleGenerationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedGenerations((currentGenerations) => {
        return [...currentGenerations, value];
      });
    } else {
      setSelectedGenerations((currentGenerations) => {
        return currentGenerations.filter((generation) => generation !== value);
      });
    }
  };

  // Type filter
  const handleTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedTypes((currentTypes) => {
        return [...currentTypes, value];
      });
    } else {
      setSelectedTypes((currentTypes) => {
        return currentTypes.filter((type) => type !== value);
      });
    }
  };

  // Retrieve filters from PokeAPI ----------

  // Retrieve generation filters
  async function fetchGenerationFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/generation");
      const result = data.results.slice(0, 3);
      setGeneration(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGenerationFilters();
  }, []);

  const pokeGeneration = generation.map((gen, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`generation/${index + 1}`}
        id={`generation/${index + 1}`}
        value={gen.name.split("-")[1]}
        onChange={handleGenerationFilter} // Add event handler here
        className="cursor-pointer"
      />
      <label htmlFor={`generation/${index + 1}`}>
        {`${gen.name.slice(0, 1).toUpperCase()}${gen.name.slice(
          1,
          10
        )} ${gen.name.slice(11).toUpperCase()}`}
      </label>
    </div>
  ));

  // Retrieve type filters
  async function fetchTypeFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/type");
      const result = data.results;
      setType(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTypeFilters();
  }, []);

  const pokeType = type.map((typ, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`type/${index + 1}`}
        id={`type/${index + 1}`}
        value={typ.name}
        onChange={handleTypeFilter}
        className="cursor-pointer"
      />
      <label htmlFor={`type/${index + 1}`}>
        {typ.name.slice(0, 1).toUpperCase() + typ.name.slice(1)}
      </label>
    </div>
  ));

  // Component
  return (
    <div className="w-52 h-screen bg-blue-200 flex flex-col gap-5 p-2">
      <div className="searchbar">
        <h1 className="text-lg">Search Pokemon</h1>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            className="p-1 border border-blue-500 rounded"
            value={search}
            onChange={handleSearch}
          ></input>
        </label>
      </div>

      <div className="generation flex flex-col">
        <button
          className="text-lg text-left"
          onClick={() => setIsOpenGeneration((prev) => !prev)}
        >
          Generation
        </button>
        {isOpenGeneration ? pokeGeneration : null}
      </div>

      <div className="type flex flex-col">
        <button
          className="text-lg text-left"
          onClick={() => setIsOpenType((prev) => !prev)}
        >
          Type
        </button>
        {isOpenType ? pokeType : null}
      </div>
    </div>
  );
};

export default Sidebar;
