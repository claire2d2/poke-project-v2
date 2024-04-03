import React, { useState, useEffect } from "react";
import axios from "axios";
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

const ScoreQuiz: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [correctAnswerSelected, setCorrectAnswerSelected] =
    useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

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
    if (!showModal && pokemonList.length > 0 && correctAnswer === "") {
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
  }, [pokemonList, correctAnswer, showModal]);

  useEffect(() => {
    if (!showModal && correctAnswer !== "") {
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
  }, [correctAnswer, pokemonList, showModal]);

  const handleAnswerSelection = (selectedAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("Great job! You got it right!");
      setCorrectAnswerSelected(true);
    } else {
      setFeedback(
        `Uh-oh, it's actually ${correctAnswer}! Better go back to our Pokédex and keep studying!`
      );
      setCorrectAnswerSelected(false);
    }
    setGuesses((prevGuesses) => prevGuesses + 1);
    setTimeout(() => reloadPokemon(), 2000);
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const reloadPokemon = () => {
    setCorrectAnswer("");
    setOptions([]);
    setFeedback("");
    setPokemonImage("");
    setCorrectAnswerSelected(false);
    playWhoIsThatPokemonSound(isMuted);
  };

  const resetGame = () => {
    setScore(0);
    setGuesses(0);
    setShowModal(false);
  };

  useEffect(() => {
    if (guesses >= 10) {
      setShowModal(true);
    }
  }, [guesses]);

  return (
    <div className="first-div-returned-by-ScoreQuiz-Component flex flex-col align-center mb-10 h-full p-5">
      <div className="game-container flex flex-row justify-between items-center mb-5 mt-5 h-full">
        <div className="left-part-of-game-container flex flex-col h-full">
          <h1 className="mb-10 text-center font-press-start">
            Who's that Pokemon?!
          </h1>

          <ul className="leading-10">
            {options.map((option, index) => (
              <li
                className="bg-red-500 hover:bg-red-700 text-white font-bold text-xl text-center py-2 px-4 rounded-full w-48 m-5"
                key={index}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="poke-displayer w-full h-full bg-cover bg-center p-16 rounded-md border-black border-solid border-2"
        >
          {pokemonImage && (
            <img
              src={pokemonImage}
              alt={correctAnswer}
              className="rounded-md"
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
      <p className="font-press-start right-0 mb-5 pl-5">
        {feedback} Score: {score}/10
      </p>
      <div className="flex flex-row gap-3 justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48"
          onClick={reloadPokemon}
        >
          Reload Pokémon
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-36"
          onClick={toggleMute}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-3xl mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Final Score: {score}/10</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreQuiz;
