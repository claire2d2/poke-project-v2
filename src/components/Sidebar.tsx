import { useState, useEffect } from "react";
import pokeApi from "../service/pokeApi";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

// Generation types
type Generation = {
  name: string;
};
type GenerationData = {
  results: Array<Generation>;
};

// Color types
type Color = {
  name: string;
};
type ColorData = {
  results: Array<Color>;
};

// Type types
type Type = {
  name: string;
};
type TypeData = {
  results: Array<Type>;
};

const Sidebar: React.FC<Props> = ({ search, setSearch }) => {
  const [generation, setGeneration] = useState<Array<Generation>>([]);
  const [color, setColor] = useState<Array<Color>>([]);
  const [type, setType] = useState<Array<Type>>([]);

  // Search bar filter
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  // Retrieve generation filters
  async function fetchGenerationFilters() {
    try {
      const { data } = await pokeApi.get<GenerationData>("/generation");
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
      />
      <label key={index} htmlFor={`generation/${index + 1}`}>
        {gen.name}
      </label>
    </div>
  ));

  // Retrieve color filters
  async function fetchColorFilters() {
    try {
      const { data } = await pokeApi.get<ColorData>("/pokemon-color");
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
      />
      <label key={index} htmlFor={`pokemon-color/${index + 1}`}>
        {col.name}
      </label>
    </div>
  ));

  // Retrieve type filters
  async function fetchTypeFilters() {
    try {
      const { data } = await pokeApi.get<TypeData>("/type");
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
      />
      <label key={index} htmlFor={`type/${index + 1}`}>
        {typ.name}
      </label>
    </div>
  ));

  return (
    <div className="w-52 bg-blue-200 flex flex-col gap-10 p-2">
      <div className="searchbar">
        <h1 className="text-lg">Search Pokemon</h1>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            className="p-1 rounded"
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
