import { useState, useEffect, ChangeEventHandler } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pokeApi from "../service/pokeApi";
import PokeType from "../components/PokeType";

// import favorite button

import FaveButton from "../components/FaveButton";

// type to define the type of data we want to get from the pokemon data
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

type PokeDexData = {};

// type for the pokemon evolution data fetching

type pokeEvolData = {};

// styling for the page
const titleStyle = "text-4xl text-center font-extrabold text-yellow-400";

const OnePoke = () => {
  // declare navigate function
  const navigate = useNavigate();

  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  // use state to change the game for pokedex section
  const [pokeGame, setPokeGame] = useState<string | null>(null);

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
    } catch (e) {
      console.log(e);
    }
  }

  // fetch eventual pokemon evolution
  async function fetchPokeEvol() {
    try {
      const response = await pokeApi.get<>(`/pokemon-species/${pokeId}`);
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
      <div className="cardCenter flex">
        <div className="leftSide">
          <img
            src={pokeData.sprites.other["official-artwork"].front_default}
            alt={`official artwork  of ${pokeData.species.name}`}
          />
        </div>
        <div className="rightSide">
          <p>Id: {pokeData.id}</p>
          <p>Height: {pokeData.height * 10} cm</p>
          <p>Weight: {pokeData.weight / 10} kg</p>
          <p>
            Types:
            {pokeData.types.map((pokeType) => {
              return <PokeType typeData={pokeType.type.name} />;
            })}
          </p>
          <p>
            Cry:{" "}
            <audio controls>
              <source src={pokeData.cries.latest} type="audio/ogg" />
            </audio>
          </p>
          <div className="pokeDex">
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
          <p>
            <FaveButton pokeId={pokeData.id} heartSize={10} />
          </p>
        </div>
      </div>
      <button onClick={() => navigate("/pokemon")}>Back</button>

      <button>Add Pokemon to my team</button>
    </div>
  );
};

export default OnePoke;
