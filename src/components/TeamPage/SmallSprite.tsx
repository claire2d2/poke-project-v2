import { useState, useEffect } from "react";
import { PokeData } from "../../components/OnePokeData";

import { fetchPokeData } from "../FetchPokeData";

const SmallSprite: React.FC<{ pokeId: number; shinyState: boolean }> = ({
  pokeId,
  shinyState,
}) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  useEffect(() => {
    fetchPokeData(pokeId, setPokeData);
  }, [pokeId]);

  if (!pokeData) {
    return <span>Loading...</span>;
  }

  return (
    <span>
      <img
        src={
          shinyState
            ? pokeData.sprites.front_shiny
            : pokeData?.sprites.front_default
        }
        alt={`sprite of ${pokeData?.species.name}`}
      />
    </span>
  );
};

export default SmallSprite;
