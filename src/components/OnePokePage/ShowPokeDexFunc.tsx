import { PokeData } from "../OnePokeData";
import { PokeDexData, pokeDexEntry } from "../OnePokePage/PokeDexData";
import { Dispatch, SetStateAction } from "react";

type SetData = Dispatch<SetStateAction<string>>;

export function showDexEntry(
  pokeGame: string,
  setGameSprite: SetData,
  setDexDescr: SetData,
  pokeData: PokeData,
  pokeSpecies: PokeDexData
) {
  switch (pokeGame) {
    case "default": {
      setGameSprite(pokeData?.sprites.front_default);
      setDexDescr(
        "Please choose a game to see the corresponding PokeDex entry!"
      );
      break;
    }
    case "red-blue": {
      setGameSprite(
        pokeData?.sprites.versions["generation-i"]["red-blue"].front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "red"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "yellow": {
      setGameSprite(
        pokeData?.sprites.versions["generation-i"].yellow.front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "yellow"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "silver": {
      setGameSprite(
        pokeData?.sprites.versions["generation-ii"].silver.front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "silver"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "gold": {
      setGameSprite(
        pokeData?.sprites.versions["generation-ii"].gold.front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "gold"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "crystal": {
      setGameSprite(
        pokeData?.sprites.versions["generation-ii"].crystal.front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "crystal"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "ruby": {
      setGameSprite(
        pokeData?.sprites.versions["generation-iii"]["ruby-sapphire"]
          .front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "ruby"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "sapphire": {
      setGameSprite(
        pokeData?.sprites.versions["generation-iii"]["ruby-sapphire"]
          .front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "sapphire"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
    case "emerald": {
      setGameSprite(
        pokeData?.sprites.versions["generation-iii"].emerald.front_default
      );
      const copy = pokeSpecies?.flavor_text_entries.filter(
        (entry: pokeDexEntry) =>
          entry.language.name === "en" && entry.version.name === "emerald"
      );
      setDexDescr(copy[0].flavor_text);
      break;
    }
  }
}
