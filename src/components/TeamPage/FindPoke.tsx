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
  const [chosenOne, setChosenOne] = useState<number>(0);
  const [randomPoke, setRandomPoke] = useState<number>(0);
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
    setFiltList([]);
  };

  // randomize chosen pokemon

  const generateRandPoke = () => {
    const randomIndex = Math.floor(Math.random() * pokeList.length);
    const randomChoice = pokeList.find((poke) => poke.id === randomIndex + 1);
    if (randomChoice) {
      setRandomPoke(randomChoice?.id);
    } else {
      setRandomPoke(0);
    }
  };

  return (
    <div className="h-full">
      <TeamTitle>Find a Pokémon</TeamTitle>
      <div className="flex flex-col group items-center">
        <div className="relative w-5/6 h-1/4 my-5">
          <label htmlFor="find-poke">Name of Pokémon</label>
          <input
            className="w-full border-2 dark:border-slate-600 dark:bg-slate-500 rounded p-1 group"
            name="find-poke"
            type="text"
            value={pokeName}
            onChange={handleChange}
            placeholder="Pikachoose..."
          />
          <ul className="absolute bg-white w-full hidden group-focus-within:block">
            {filtList.length > 15 || pokeName === ""
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
          <div className="w-full my-3 h-1/4">
            <ChosenPoke id={chosenOne} />
          </div>
        </div>
      </div>
      <TeamTitle>Random Pokémon</TeamTitle>
      <div className="flex flex-col group items-center">
        <div className="relative w-5/6 h-1/2 my-5">
          <button
            onClick={generateRandPoke}
            className="bg-red-600 py-2 px-1 rounded-lg text-white font-bold my-2"
          >
            Generate random pokémon
          </button>
          <div className="w-full my-3 h-1/2">
            <ChosenPoke id={randomPoke} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPoke;
