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
        <label htmlFor="Search">
          Search Pokemon
          <input
            type="text"
            className="p-1 rounded"
            value={search}
            onChange={handleSearch}
          ></input>
        </label>
      </div>
      <div className="generation flex flex-col">
        <label htmlFor="generation">
          Generation I
          <input type="checkbox" name="" id="" />
        </label>
        <label htmlFor="generation">
          Generation II
          <input type="checkbox" name="" id="" />
        </label>{" "}
        <label htmlFor="generation">
          Generation III
          <input type="checkbox" name="" id="" />
        </label>
      </div>
      <div className="colour">
        {" "}
        <label htmlFor="colour">
          Colour <input type="checkbox" name="" id="" />
        </label>{" "}
      </div>
      <div className="type">
        {" "}
        <label htmlFor="type">
          Type
          <input type="checkbox" name="" id="" />
        </label>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
