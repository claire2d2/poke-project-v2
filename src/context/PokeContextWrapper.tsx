import { createContext, useState, useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export const PokeContext = createContext();

// declare team type

type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  members: Array<number>;
};

function PokeContextWrapper({ children }) {
  const [currTeam, setCurrTeam] = useState<Array<number>>([]);

  // update local storage to store the current team every time it is changed
  useEffect(() => {
    localStorage.setItem("currPokeTeam", JSON.stringify(currTeam));
  }, [currTeam]);

  // state to know whether the "current" team on the teams page is a new team or an already created team
  const [teamToEdit, setTeamToEdit] = useState<pokeTeam | null>(null);

  // state for showing the pokemon list
  const [pokeList, setPokeList] = useState(null);
  return (
    <PokeContext.Provider
      value={{
        currTeam,
        setCurrTeam,
        teamToEdit,
        setTeamToEdit,
        pokeList,
        setPokeList,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
}

export default PokeContextWrapper;
