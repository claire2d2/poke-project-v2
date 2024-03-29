import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pokeApi from "../service/pokeApi";
import PokeType from "../components/PokeType";

// import favorite button

import FaveButton from "../components/FaveButton";

// type for data to fetch from pokeapi/pokemon/id
type PokeImage = {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": { front_default: string };
      yellow: { front_default: string };
    };
    "generation-ii": {
      crystal: { front_default: string };
      gold: { front_default: string };
      silver: { front_default: string };
    };
    "generation-iii": {
      "ruby-sapphire": { front_default: string };

      emerald: { front_default: string };
    };
  };
};
type PokeType = {
  type: {
    name: string;
  };
};
type PokeData = {
  id: number;
  height: number;
  weight: number;
  cries: {
    latest: string;
  };
  species: { name: string };
  sprites: PokeImage;
  types: Array<PokeType>;
};

// data to fetch from the pokeapi/pokemon-species/id
type PokeDexData = {
  habitat: {
    name: string;
  };
};

// styling for the page
const titleStyle = "text-4xl text-center font-extrabold text-yellow-400";

const OnePoke = () => {
  // declare navigate function
  const navigate = useNavigate();

  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  // use state to change the game for pokedex section
  const [pokeGame, setPokeGame] = useState<string | null>(null);

  // use state to get data from the pokemon species
  const [pokeSpecies, setPokeSpecies] = useState<PokeDexData | null>(null);

  const [pokeGameSprite, setPokeGameSprite] = useState<
    string | null | undefined
  >(null);

  // const pokeGameNameArray = [
  //   "red",
  //   "blue",
  //   "yellow",
  //   "gold",
  //   "silver",
  //   "crystal",
  //   "ruby",
  //   "sapphire",
  //   "emerald",
  // ];

  const handleGameChange = (e: ChangeEventHandler<HTMLSelectElement>) => {
    // sets the game
    setPokeGame(e.currentTarget.value);
    // sets the sprite depending on the game
    // TODO : if pokemon doesn't exist in game, don't propose it
    switch (pokeGame) {
      case "red":
      case "blue":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-i"]["red-blue"].front_default
        );
        break;
      case "yellow":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-i"].yellow.front_default
        );
        break;
      case "silver":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-ii"].silver.front_default
        );
        break;
      case "gold":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-ii"].gold.front_default
        );
        break;
      case "crystal":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-ii"].crystal.front_default
        );
        break;
      case "ruby":
      case "sapphire":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-iii"]["ruby-sapphire"]
            .front_default
        );
        break;
      case "emerald":
        setPokeGameSprite(
          pokeData?.sprites.versions["generation-iii"].emerald.front_default
        );
        break;
      default:
        setPokeGameSprite(pokeData?.sprites.front_default);
        break;
    }
  };

  // get the pokemon name from the url
  const { pokeId } = useParams();
  // fetch the pokemon using pokeApi
  async function fetchPokeData() {
    try {
      const response = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
      setPokeData(response.data);
      const pokedex = await pokeApi.get<PokeDexData>(
        `/pokemon-species/${pokeId}`
      );
      setPokeSpecies(pokedex.data);
    } catch (e) {
      console.log(e);
    }
  }

  // use effect to launch the fetch function once mounted
  useEffect(() => {
    fetchPokeData();
  }, [pokeId]);

  // show "Loading" if the data is loading or nonexistent
  // add this condition to check if pokemon exists or not : || pokeId !== "pikachu"
  if (!pokeData) {
    return (
      <div>
        <p>Loading ...</p>
        <p>Are you sure this pokemon exists?</p>
      </div>
    );
  }

  // capitalize first letter of pokemon name for the header
  const pokeTitle: string =
    pokeData.species.name[0].toUpperCase() + pokeData.species.name.slice(1);

  return (
    <div className="p-8">
      <h1 className={`${titleStyle}`}>{pokeTitle}</h1>
      <div className="cardCenter flex gap-5 py-5 px-10">
        <div className="leftSide basis-2/5 shadow-lg">
          <img
            className="mx-auto"
            src={pokeData.sprites.other["official-artwork"].front_default}
            alt={`official artwork  of ${pokeData.species.name}`}
          />
        </div>
        <div className="rightSide basis-3/5 border-solid border border-gray-100 p-4">
          {/* Describe here the physical charact of the pokemon */}
          <div className="flex justify-between">
            <h2 className="text-2xl p-1">Physical characteristics</h2>{" "}
            <FaveButton pokeId={pokeData.id} heartSize={4} />
          </div>
          <div className="p-1">
            <p className="my-1">
              <span className="font-semibold">Habitat :</span>{" "}
              {pokeSpecies?.habitat.name}
            </p>
            <p className="my-1">
              <span className="font-semibold">Height :</span>{" "}
              {pokeData.height * 10} cm
            </p>
            <p className="my-1">
              <span className="font-semibold">Weight :</span>{" "}
              {pokeData.weight / 10} kg
            </p>
            <p className="flex my-1">
              <span className="font-semibold mr-3">Types:</span>
              {pokeData.types.map((pokeType) => {
                return (
                  <span className="basis-1/6 text-center text-sm mx-1">
                    {" "}
                    <PokeType typeData={pokeType.type.name} />{" "}
                  </span>
                );
              })}
            </p>
            <p className="flex my-1 items-center align-items">
              <span className="font-semibold mr-3">Cry:</span>
              <audio className="" controls>
                <source src={pokeData.cries.latest} type="audio/ogg" />
              </audio>
            </p>
          </div>
          {/* Here the customisable data */}
          <div className="pokeDex">
            <h2 className="text-2xl p-1">Data according to each game</h2>
            <select onChange={handleGameChange} id="gameChange">
              <option value={null}>Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="crystal">Crystal</option>
              <option value="ruby">Ruby</option>
              <option value="sapphire">Sapphire</option>
              <option value="emerald">Emerald</option>
            </select>
            <p>{pokeGame ? pokeGame : "hey"}</p>
            <p>Pokemon Sprite</p>
            <div>
              <img
                src={pokeGame ? pokeGameSprite : pokeData.sprites.front_default}
                alt="sprite of pokemon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between px-10">
        <button
          onClick={() => navigate("/pokemon")}
          className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Back
        </button>
        <button className="mx-3 bg-yellow-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-600 hover:border-blue-500 rounded">
          Add Pokemon to my team
        </button>
      </div>
    </div>
  );
};

export default OnePoke;
