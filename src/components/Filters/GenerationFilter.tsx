import { useEffect } from "react";
import pokeApi from "../../service/pokeApi";

// Type
type Filter = {
  name: string;
};
type FilterData = {
  results: Filter[];
};

type Props = {
  generation: Filter[];
  setGeneration: React.Dispatch<React.SetStateAction<Filter[]>>;
  isOpenGeneration: Boolean;
  setIsOpenGeneration: React.Dispatch<React.SetStateAction<Boolean>>;
  setSelectedGenerations: (cb: (state: string[]) => string[]) => void;
};

const GenerationFilter: React.FC<Props> = ({
  generation,
  setGeneration,
  isOpenGeneration,
  setIsOpenGeneration,
  setSelectedGenerations,
}) => {
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
        onChange={handleGenerationFilter}
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

  return (
    <div className="generation flex flex-col px-2">
      <button
        className="font-bold text-left flex justify-between"
        onClick={() => setIsOpenGeneration((prev) => !prev)}
      >
        {isOpenGeneration ? (
          <div>
            <p>Generation ▲</p>
          </div>
        ) : (
          <div>
            <p>Generation ▼</p>
          </div>
        )}
      </button>
      {isOpenGeneration ? pokeGeneration : null}
    </div>
  );
};

export default GenerationFilter;
