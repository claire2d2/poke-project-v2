import { useEffect } from "react";
import pokeApi from "../../service/pokeApi";

type Filter = {
  name: string;
};

type FilterData = {
  results: Filter[];
};

type Props = {
  type: Filter[];
  setType: React.Dispatch<React.SetStateAction<Filter[]>>;
  isOpenType: Boolean;
  setIsOpenType: React.Dispatch<React.SetStateAction<Boolean>>;
  setSelectedTypes: (cb: (state: string[]) => string[]) => void;
};

const TypeFilter: React.FC<Props> = ({
  type,
  setType,
  isOpenType,
  setIsOpenType,
  setSelectedTypes,
}) => {
  // Type filter
  const handleTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    const value = e.currentTarget.value;
    if (isChecked) {
      setSelectedTypes((current) => {
        return [...current, value];
      });
    } else {
      setSelectedTypes((current) => {
        return current.filter((type) => type !== value);
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

  return (
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
  );
};

export default TypeFilter;
