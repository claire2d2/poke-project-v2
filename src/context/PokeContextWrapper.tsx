import { createContext, useState } from "react";

export const PokeContext = createContext();

function PokeContextWrapper({ children }) {
  const [pokeTeam, setPokeTeam] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);
  const [pokeList, setPokeList] = useState(null);
  return (
    <PokeContext.Provider
      value={{ pokeTeam, setPokeTeam, pokeList, setPokeList }}
    >
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContextWrapper;
