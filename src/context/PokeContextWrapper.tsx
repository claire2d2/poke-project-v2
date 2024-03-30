import { createContext, useState, useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export const PokeContext = createContext();

function PokeContextWrapper({ children }) {
  const [currTeam, setCurrTeam] = useState<Array<number>>([]);

  // update local storage to store the current team every time it is changed
  useEffect(() => {
    localStorage.setItem("currPokeTeam", JSON.stringify(currTeam));
  }, [currTeam]);

  const [pokeList, setPokeList] = useState(null);
  return (
    <PokeContext.Provider
      value={{ currTeam, setCurrTeam, pokeList, setPokeList }}
    >
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContextWrapper;
