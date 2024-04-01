import { PokeData } from "./OnePokeData";

// data to fetch from the pokeapi/pokemon-species/id
export type pokeDexEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
  version: { name: string };
};

type pokeGenus = {
  genus: string;
  language: {
    name: string;
  };
};

export type PokeDexData = {
  habitat: {
    name: string;
  };
  // pokedex entries based on game
  flavor_text_entries: Array<pokeDexEntry>;
  // pokedex genus based on language
  genera: Array<pokeGenus>;
};
