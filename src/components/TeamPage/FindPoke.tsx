import backendApi from "../../service/backendApi";
// import style
import { useState, useEffect } from "react";
import { TeamTitle } from "./TeamPageStyle";
import ChosenPoke from "./ChosenPoke";

// declaring pokemon type to recognize data being fetched from the API
type PokeObject = {
  id: number;
  name: string;
};

// use debouncing to avoid handling too many requests at the same time

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const FindPoke = () => {
  // TODO : finish search bar
  const [pokeName, setPokeName] = useState<string>("");
  const [pokeList, setPokeList] = useState<Array<PokeObject>>([]);
  const [filtList, setFiltList] = useState<Array<PokeObject>>(pokeList);
  const [chosenOne, setChosenOne] = useState<number | null>(null);
  const [showChosen, setShowChosen] = useState<boolean>(true);
  const debouncedSearch = useDebouncedValue(pokeName, 300);

  // change search result dynamically
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPokeName(e.currentTarget.value);
  };

  // function to fetch all the possible pokemon
  // TODO mutualize with the search element from the all pokemon page

  async function fetchAllPokemon() {
    try {
      const { data } = await backendApi.get("/pokemons");
      setPokeList(data);
    } catch (error) {
      console.log(error);
    }
  }

  // set pokemon list result
  useEffect(() => {
    fetchAllPokemon();
    setShowChosen(true);
  }, [debouncedSearch]);

  // set search result
  useEffect(() => {
    const copy = pokeList.filter((poke) =>
      poke.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFiltList(copy);
  }, [debouncedSearch]);

  // function to choose pokemon when clicking on it

  const iChooseYouPikachu = (id: number) => {
    setChosenOne(id);
    setShowChosen(false);
  };

  return (
    <div className="h-full">
      <TeamTitle>Find a pokémon</TeamTitle>
      <div className="flex flex-col group justify-center items-center">
        <div className="w-5/6 group-hover:block">
          <label htmlFor="find-poke">Name of pokémon:</label>
          <input
            className="w-full border-2 border-gray-100 group"
            name="find-poke"
            type="text"
            value={pokeName}
            onChange={handleChange}
            placeholder="Pikachoose..."
          />
          <ul className="bg-white w-full hidden group-focus-within:block">
            {filtList.length > 15
              ? "Please refine your search"
              : filtList.length === 0
              ? "No pokemon with that name"
              : filtList.map((poke) => {
                  return (
                    <li>
                      <button
                        onClick={() => iChooseYouPikachu(poke.id)}
                        className="hover:bg-gray-400 w-full text-left active:text-red-200"
                      >
                        {poke.name}
                      </button>
                    </li>
                  );
                })}
          </ul>
        </div>
        <div hidden={showChosen} className="w-5/6 my-3">
          <ChosenPoke id={chosenOne} />
        </div>
        <div>Random pokemon</div>
      </div>
    </div>
  );
};

export default FindPoke;
