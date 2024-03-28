import React from "react";

const Sidebar = () => {
  return (
    <div className="w-52 bg-blue-200 flex flex-col gap-10">
      <div className="searchbar">
        <label htmlFor="Search">
          Search Pokemon
          <input type="text p-40"></input>
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
