import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";
import GenerationFilter from "./Filters/GenerationFilter";
import ColorFilter from "./Filters/ColorFilter";

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

      <ColorFilter
        color={color}
        setColor={setColor}
        isOpenColor={isOpenColor}
        setIsOpenColor={setIsOpenColor}
        setSelectedColors={setSelectedColors}
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
    </div>
  );
};

export default Sidebar;
