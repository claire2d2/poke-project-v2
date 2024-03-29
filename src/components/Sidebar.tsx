import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

// Type
type Filter = {
  name: string;
};
type FilterData = {
  results: Array<Filter>;
};

const Sidebar: React.FC<Props> = ({ search, setSearch }) => {
  const [generation, setGeneration] = useState<Array<Filter>>([]);
  const [color, setColor] = useState<Array<Filter>>([]);
  const [type, setType] = useState<Array<Filter>>([]);

  // Search bar filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // Retrieve generation filters
  async function fetchGenerationFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/generation");
      setGeneration(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGenerationFilters();
  }, []);

  const pokeGeneration = generation.slice(0, 3).map((gen, index) => (
    <div className="flex gap-2">
      <input
        type="checkbox"
        name={`generation/${index + 1}`}
        id={`generation/${index + 1}`}
        className="cursor-pointer"
      />
      <label key={index} htmlFor={`generation/${index + 1}`}>
        {`${gen.name.slice(0, 1).toUpperCase()}${gen.name.slice(
          1,
          10
        )} ${gen.name.slice(11).toUpperCase()}`}
      </label>
    </div>
  ));

  // Retrieve color filters
  async function fetchColorFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/pokemon-color");
      setColor(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchColorFilters();
  });

  const pokeColor = color.map((col, index) => (
    <div className="flex gap-2">
      <input
        type="checkbox"
        name={`pokemon-color/${index + 1}`}
        id={`pokemon-color/${index + 1}`}
        className="cursor-pointer"
      />
      <label key={index} htmlFor={`pokemon-color/${index + 1}`}>
        {col.name.slice(0, 1).toUpperCase() + col.name.slice(1)}
      </label>
    </div>
  ));

  // Retrieve type filters
  async function fetchTypeFilters() {
    try {
      const { data } = await pokeApi.get<FilterData>("/type");
      setType(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTypeFilters();
  }, []);

  const pokeType = type.map((typ, index) => (
    <div className="flex gap-2">
      <input
        type="checkbox"
        name={`type/${index + 1}`}
        id={`type/${index + 1}`}
        className="cursor-pointer"
      />
      <label key={index} htmlFor={`type/${index + 1}`}>
        {typ.name.slice(0, 1).toUpperCase() + typ.name.slice(1)}
      </label>
    </div>
  ));

  return (
    <div className="w-52 bg-blue-200 flex flex-col gap-5 p-2">
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
        <h1 className="text-lg">Generation</h1>
        {pokeGeneration}
      </div>

      {/* TO DO: Automation based on API */}
      <div className="color flex flex-col">
        <h1 className="text-lg">Color</h1>
        {pokeColor}
      </div>

      <div className="type flex flex-col">
        <h1 className="text-lg">Type</h1>
        {pokeType}
      </div>
    </div>
  );
};

export default Sidebar;
