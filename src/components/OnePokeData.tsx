// type for data to fetch from pokeapi/pokemon/id
export type PokeImage = {
  front_default: string;
  front_shiny: string;
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
export type PokeTypeLabel = {
  type: {
    name: string;
  };
};
export type PokeData = {
  id: number;
  height: number;
  weight: number;
  cries: {
    latest: string;
  };
  species: { name: string };
  sprites: PokeImage;
  types: Array<PokeTypeLabel>;
};
