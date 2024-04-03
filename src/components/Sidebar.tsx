import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";
import GenerationFilter from "./Filters/GenerationFilter";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  setSelectedTypes: (cb: (state: string[]) => string[]) => void;
  setSelectedGenerations: (cb: (state: string[]) => string[]) => void;
  setSelectedColors: (cb: (state: string[]) => string[]) => void;
};

// Type
type Filter = {
  name: string;
};
type FilterData = {
  results: Filter[];
};

const Sidebar: React.FC<Props> = ({
  search,
  setSearch,
  setSelectedTypes,
  setSelectedGenerations,
  setSelectedColors,
}) => {
  const [generation, setGeneration] = useState<Filter[]>([]);
  const [type, setType] = useState<Filter[]>([]);
  const [color, setColor] = useState<Filter[]>([]);

  // State for toggle filters
  const [isOpenGeneration, setIsOpenGeneration] = useState<Boolean>(false);
  const [isOpenType, setIsOpenType] = useState<Boolean>(false);
  const [isOpenColor, setIsOpenColor] = useState<Boolean>(false);

  // Search filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
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

  // Color filter
  const handleColorFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedColors((current) => {
        return [...current, value];
      });
    } else {
      setSelectedColors((current) => {
        return current.filter((col) => col !== value);
      });
    }
  };

  // Retrieve type filters
  async function fetchTypeFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/type");
      const result = data.results;
      result.sort((a, b) => a.name.localeCompare(b.name));
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

  // Retrieve color filters
  async function fetchColorFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/pokemon-color");
      const result = data.results;
      setColor(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchColorFilters();
  }, []);

  const pokeColor = color.map((col, index) => (
    <div className="flex gap-2" key={index}>
      <input
        type="checkbox"
        name={`color/${index + 1}`}
        id={`color/${index + 1}`}
        value={col.name}
        onChange={handleColorFilter}
        className="cursor-pointer"
      />
      <label htmlFor={`color/${index + 1}`}>
        {col.name.slice(0, 1).toUpperCase() + col.name.slice(1)}
      </label>
    </div>
  ));

  // Component
  return (
    <div
      className="w-64 bg-blue-200 flex flex-col gap-5 p-2 overflow-y-scroll overflow-x-hidden"
      style={{ height: "calc(100vh - 99px)" }}
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-bold">Search Pokemon</h1>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            className="p-2 rounded-lg bg-blue-50 w-full"
            value={search}
            onChange={handleSearch}
          ></input>
        </label>
      </div>

      <GenerationFilter
        generation={generation}
        setGeneration={setGeneration}
        isOpenGeneration={isOpenGeneration}
        setIsOpenGeneration={setIsOpenGeneration}
        setSelectedGenerations={setSelectedGenerations}
      />

      <div className="type flex flex-col px-2">
        <button
          className="font-bold text-left  flex justify-between"
          onClick={() => setIsOpenType((prev) => !prev)}
        >
          {isOpenType ? (
            <div>
              <p>Type ▲</p>
            </div>
          ) : (
            <div>
              <p>Type ▼</p>
            </div>
          )}
        </button>
        {isOpenType ? pokeType : null}
      </div>

      <div className="color flex flex-col px-2">
        <button
          className="font-bold text-left flex justify-between"
          onClick={() => setIsOpenColor((prev) => !prev)}
        >
          {isOpenColor ? (
            <div>
              <p>Color ▲</p>
            </div>
          ) : (
            <div>
              <p>Color ▼</p>
            </div>
          )}
        </button>
        {isOpenColor ? pokeColor : null}
      </div>
    </div>
  );
};

export default Sidebar;
