import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pokeApi from "../service/pokeApi";

type PokeImage = {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
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

// styling for the page
const titleStyle = "text-4xl text-center font-extrabold text-yellow-400";

const OnePoke = () => {
  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  // get the pokemon name from the url
  const { pokeId } = useParams();

  // fetch the pokemon using axios

  async function fetchPokeData() {
    try {
      const response = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
      setPokeData(response.data);
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
          <p>Height: {pokeData.height * 10} cm</p>
          <p>Weight: {pokeData.weight / 10} kg</p>
          <p>
            Types:{" "}
            {pokeData.types.map((pokeType) => {
              return <span key={pokeType.type.name}>{pokeType.type.name}</span>;
            })}
          </p>
          <p>
            Cry:{" "}
            <audio controls>
              <source src={pokeData.cries.latest} type="audio/ogg" />
            </audio>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnePoke;
