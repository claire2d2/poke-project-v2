import { useEffect, useState } from "react";
import pokeApi from "../service/pokeApi";
import PokeType from "./PokeType";

type SpriteData = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

type TypesData = {
  type: { name: string };
};

type PokeData = {
  species: { name: string };
  sprites: SpriteData;
  types: TypesData[];
};

const PokeCard: React.FC<{ pokeName: string }> = ({ pokeName }) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  async function fetchPokeImage() {
    try {
      const { data } = await pokeApi.get<PokeData>(`/pokemon/${pokeName}`);
      setPokeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeImage();
  }, [pokeName]);

  if (!pokeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col align-center justify-center items-center gap-2">
      <img
        src={pokeData.sprites.other["official-artwork"].front_default}
        alt={pokeData.species.name}
      />
      <h1 className="text-center text-lg font-medium">
        {pokeData.species.name.charAt(0).toUpperCase() +
          pokeData.species.name.slice(1)}
      </h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {pokeData.types && pokeData.types.length > 0 ? (
          pokeData.types.map((typeData, index) => (
            <PokeType key={index} typeData={typeData.type.name} />
          ))
        ) : (
          <p>No types</p>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
