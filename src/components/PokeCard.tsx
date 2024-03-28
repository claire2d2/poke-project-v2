import { useEffect, useState } from "react";
import pokeApi from "../service/pokeApi";

type SpriteData = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

type NamesData = {
  species: { name: string };
};

type TypesData = {
  type: { name: string };
};

type PokeData = {
  name: NamesData[];
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
    <div className="flex flex-col align-center justify-center gap-2">
      <img
        src={pokeData.sprites.other["official-artwork"].front_default}
        alt=""
      />
      <h1 className="text-center text-lg font-medium">
        {pokeData.species.name.charAt(0).toUpperCase() +
          pokeData.species.name.slice(1)}
      </h1>
      <div className="flex gap-3 justify-center">
        {pokeData.types && pokeData.types.length > 0 ? (
          pokeData.types.map((typeData, index) => (
            <p key={index} className="bg-slate-100 px-2 py-0.5 rounded-full">
              {typeData.type.name.charAt(0).toUpperCase() +
                typeData.type.name.slice(1)}
            </p>
          ))
        ) : (
          <p>No types</p>
        )}
      </div>
    </div>
  );
};

export default PokeCard;
