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

type PokeData = {
  id: number;
  name: string;
  sprites: PokeImage;
};

const OnePoke = () => {
  // use state to get the wanted pokemon from the pokemonlist? state
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  // get the pokemon name from the url
  const { pokeId } = useParams();

  // fetch the pokemon using axios

  async function fetchPokeData(name: string) {
    try {
      const response = await pokeApi.get<PokeData>(`/pokemon/${name}`);
      setPokeData(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  // use effect to launch the fetch function once mounted

  useEffect(() => {
    fetchPokeData(pokeId);
  }, [pokeId]);

  // show "Loading" if the data is loading or nonexistent
  if (!pokeData) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>{pokeData.name}</h1>
      <img
        src={pokeData.sprites.other["official-artwork"].front_default}
        alt={`official artwork  of ${pokeData.name}`}
      />
      <img src={pokeData.sprites.front_default} alt="" />
    </div>
  );
};

export default OnePoke;
