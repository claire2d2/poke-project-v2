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
  color: Filter[];
  setColor: React.Dispatch<React.SetStateAction<Filter[]>>;
  isOpenColor: Boolean;
  setIsOpenColor: React.Dispatch<React.SetStateAction<Boolean>>;
  setSelectedColors: (cb: (state: string[]) => string[]) => void;
};

const ColorFilter: React.FC<Props> = ({
  color,
  setColor,
  isOpenColor,
  setIsOpenColor,
  setSelectedColors,
}) => {
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
  return (
    <div className="type flex flex-col px-2">
      <button
        className="font-bold text-left  flex justify-between"
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
  );
};

export default ColorFilter;
