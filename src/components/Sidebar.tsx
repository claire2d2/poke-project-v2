type Props = {
  search: string;
  setSearch: (search: string) => void;
};

const Sidebar: React.FC<Props> = ({ search, setSearch }) => {
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

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

      {/* TO DO: Automation based on API */}
      <div className="generation flex flex-col">
        <h1 className="text-lg">Generation</h1>
        <label htmlFor="generation-one">
          Generation I
          <input type="checkbox" name="generation-one" id="generation-one" />
        </label>
        <label htmlFor="generation-two">
          Generation II
          <input type="checkbox" name="generation-two" id="generation-two" />
        </label>{" "}
        <label htmlFor="generation-three">
          Generation III
          <input
            type="checkbox"
            name="generation-three"
            id="generation-three"
          />
        </label>
      </div>

      {/* TO DO: Automation based on API */}
      <div className="color flex flex-col">
        <h1 className="text-lg">Color</h1>
        <label htmlFor="green">
          Green
          <input type="checkbox" name="green" id="green" />
        </label>
        <label htmlFor="red">
          Red
          <input type="checkbox" name="red" id="red" />
        </label>
        <label htmlFor="blue">
          Blue
          <input type="checkbox" name="blue" id="blue" />
        </label>
      </div>

      {/* TO DO: Automation based on API */}
      <div className="type flex flex-col">
        <h1 className="text-lg">Type</h1>
        <label htmlFor="normal">
          Normal
          <input type="checkbox" name="normal" id="normal" />
        </label>

        <label htmlFor="fire">
          Fire
          <input type="checkbox" name="fire" id="fire" />
        </label>

        <label htmlFor="water">
          Water
          <input type="checkbox" name="water" id="water" />
        </label>

        <label htmlFor="electric">
          Electric
          <input type="checkbox" name="electric" id="electric" />
        </label>

        <label htmlFor="grass">
          Grass
          <input type="checkbox" name="grass" id="grass" />
        </label>

        <label htmlFor="ice">
          Ice
          <input type="checkbox" name="ice" id="ice" />
        </label>

        <label htmlFor="fighting">
          Fighting
          <input type="checkbox" name="fighting" id="fighting" />
        </label>

        <label htmlFor="poison">
          Poison
          <input type="checkbox" name="poison" id="poison" />
        </label>

        <label htmlFor="ground">
          Ground
          <input type="checkbox" name="ground" id="ground" />
        </label>

        <label htmlFor="flying">
          Flying
          <input type="checkbox" name="flying" id="flying" />
        </label>

        <label htmlFor="psychic">
          Psychic
          <input type="checkbox" name="psychic" id="psychic" />
        </label>

        <label htmlFor="bug">
          Bug
          <input type="checkbox" name="bug" id="bug" />
        </label>

        <label htmlFor="rock">
          Rock
          <input type="checkbox" name="rock" id="rock" />
        </label>

        <label htmlFor="ghost">
          Ghost
          <input type="checkbox" name="ghost" id="ghost" />
        </label>

        <label htmlFor="dragon">
          Dragon
          <input type="checkbox" name="dragon" id="dragon" />
        </label>

        <label htmlFor="dark">
          Dark
          <input type="checkbox" name="dark" id="dark" />
        </label>

        <label htmlFor="steel">
          Steel
          <input type="checkbox" name="steel" id="steel" />
        </label>

        <label htmlFor="fairy">
          Fairy
          <input type="checkbox" name="fairy" id="fairy" />
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
