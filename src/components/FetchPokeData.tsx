import pokeApi from "../service/pokeApi";
import { Dispatch, SetStateAction } from "react";
import { PokeData } from "./OnePokeData";
import { PokeDexData } from "./OnePokePage/PokeDexData";

type SetPokeData = Dispatch<SetStateAction<PokeData | null>>;
type SetPokeSpecies = Dispatch<SetStateAction<PokeDexData | null>>;
// fetch the pokemon using pokeApi
export async function fetchPokeData(pokeId: number, setPokeData: SetPokeData) {
  try {
    const response = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
    setPokeData(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokeDexData(
  pokeId: number,
  setPokeSpecies: SetPokeSpecies
) {
  try {
    const pokedex = await pokeApi.get<PokeDexData>(
      `/pokemon-species/${pokeId}`
    );
    setPokeSpecies(pokedex.data);
  } catch (e) {
    console.log(e);
  }
}

// TODO add types to useState hooks
