import { useState } from "react";
import GenerationFilter from "./Filters/GenerationFilter";
import ColorFilter from "./Filters/ColorFilter";
import TypeFilter from "./Filters/TypeFilter";

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

      <TypeFilter
        type={type}
        setType={setType}
        isOpenType={isOpenType}
        setIsOpenType={setIsOpenType}
        setSelectedTypes={setSelectedTypes}
      />
    </div>
  );
};

export default Sidebar;
