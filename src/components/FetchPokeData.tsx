import pokeApi from "../service/pokeApi";
import { PokeData } from "./OnePokeData";
import { PokeDexData } from "./OnePokePage/PokeDexData";
// fetch the pokemon using pokeApi
export async function fetchPokeData(pokeId: number, setPokeData) {
  try {
    const response = await pokeApi.get<PokeData>(`/pokemon/${pokeId}`);
    setPokeData(response.data);
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPokeDexData(pokeId: number, setPokeSpecies) {
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
