import React, { useState, useEffect } from "react";
import axios from "axios";

import useMute from "../../context/usePoke";
import MuteButton from "./MuteButton";

import whoIsThatPokemonSound from "../../../public/who-s-that-pokemon.mp3";
import backgroundImage from "../../../public/who-s-that-pokemon-bg.jpeg";

type PokeImage = {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

type PokeType = {
  type: {
    name: string;
  };
};

type PokemonData = {
  name: string;
  sprites: PokeImage;
  types: PokeType[];
};

function playWhoIsThatPokemonSound(isMuted: boolean) {
  if (!isMuted) {
    new Audio(whoIsThatPokemonSound).play();
  }
}

const TrainQuiz: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [correctAnswerSelected, setCorrectAnswerSelected] =
    useState<boolean>(false);
  const { isMuted } = useMute();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=386"
        );
        const pokemonData: PokemonData[] = response.data.results;
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    if (pokemonList.length === 0) {
      fetchPokemonList();
    }
  }, [pokemonList]);

  useEffect(() => {
    if (pokemonList.length > 0 && correctAnswer === "") {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];
      const capitalizedCorrectAnswer =
        randomPokemon.name.charAt(0).toUpperCase() +
        randomPokemon.name.slice(1);
      setCorrectAnswer(capitalizedCorrectAnswer);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`)
        .then((response) => {
          setPokemonImage(
            response.data.sprites.other["official-artwork"].front_default
          );
        })
        .catch((error) => {
          console.error("Error fetching Pokémon image:", error);
        });
    }
  }, [pokemonList, correctAnswer]);

  useEffect(() => {
    if (correctAnswer !== "") {
      const incorrectOptions: string[] = [];
      while (incorrectOptions.length < 2) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];
        const capitalizedIncorrectOption =
          randomPokemon.name.charAt(0).toUpperCase() +
          randomPokemon.name.slice(1);
        if (
          randomPokemon.name !== correctAnswer &&
          !incorrectOptions.includes(capitalizedIncorrectOption)
        ) {
          incorrectOptions.push(capitalizedIncorrectOption);
        }
      }
      const allOptions = [...incorrectOptions, correctAnswer];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    }
  }, [correctAnswer, pokemonList]);

  const handleAnswerSelection = (selectedAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setFeedback("Great job! You got it right!");
      setCorrectAnswerSelected(true);
    } else {
      setFeedback(
        `Uh-oh, it's actually ${correctAnswer}! Better go back to our Pokédex and keep studying!`
      );
      setCorrectAnswerSelected(false);
    }
  };

  const reloadPokemon = () => {
    setCorrectAnswer("");
    setOptions([]);
    setFeedback("");
    setPokemonImage("");
    setCorrectAnswerSelected(false);
    playWhoIsThatPokemonSound(isMuted);
  };

  return (
    <div className="first-div-returned-by-TrainQuiz-Component flex flex-col align-center pb-20 p-5">
      <div className="game-container flex flex-col md:flex-row justify-between items-center mb-5 mt-5 h-full">
        <div className="left-part-of-game-container flex flex-col h-full">
          <h1 className="my-3 md:mb-10 text-center font-press-start">
            Who's that Pokemon?!
          </h1>

          <ul className="leading-10 flex flex-col items-center mb-2 lg:mb-0">
            {options.map((option, index) => (
              <li
                className=" cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold text-xl text-center py-2 px-4 rounded-full w-48 m-1 lg:m-5"
                key={index}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 justify-center items-center mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48"
              onClick={reloadPokemon}
            >
              Reload Pokémon
            </button>
            <MuteButton />
          </div>
        </div>

        <div className="relative poke-displayer w-4/5 h-4/5 bg-cover bg-center rounded-lg border-black dark:border-slate-500 border-solid border-2">
          <img
            src={backgroundImage}
            alt="Who's that Pokémon Background"
            className="h-full w-full"
          />
          {pokemonImage && (
            <img
              src={pokemonImage}
              alt={correctAnswer}
              className="scale-50 -top-20 -left-20 lg:scale-95 absolute lg:top-0 lg:left-0"
              style={{
                filter:
                  correctAnswerSelected || feedback !== ""
                    ? "none"
                    : "brightness(0%)",
              }}
            />
          )}
        </div>
      </div>
      <p className="font-press-start right-0 mb-5 pl-5">{feedback}</p>
    </div>
  );
};

export default TrainQuiz;
