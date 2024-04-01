import React, { useState, useEffect } from "react";
import axios from "axios";
import whoIsThatPokemonSound from "../../public/who-s-that-pokemon.mp3";

// Define types

const QuizPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [correctAnswerSelected, setCorrectAnswerSelected] =
    useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

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
      setCorrectAnswer(randomPokemon.name);
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
        if (
          randomPokemon.name !== correctAnswer &&
          !incorrectOptions.includes(randomPokemon.name)
        ) {
          incorrectOptions.push(randomPokemon.name);
        }
      }
      const allOptions = [...incorrectOptions, correctAnswer];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    }
  }, [correctAnswer, pokemonList, showModal]);

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

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const reloadPokemon = () => {
    setCorrectAnswer("");
    setOptions([]);
    setFeedback("");
    setPokemonImage("");
    setCorrectAnswerSelected(false);
  };

  const handlePlayClick = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Who's that Pokémon?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Click the button below to start playing!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handlePlayClick}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showModal && (
        <div>
          <p>Who's that Pokémon</p>
          <img
            src={pokemonImage}
            alt={correctAnswer}
            className="rounded-md shadow-md"
            style={{
              filter:
                correctAnswerSelected || feedback !== ""
                  ? "none"
                  : "brightness(0%)",
            }}
          />
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerSelection(option)}>
                {option}
              </li>
            ))}
          </ul>
          <p>{feedback}</p>
        </div>
      )}

      <audio autoPlay={!isMuted} src={whoIsThatPokemonSound} muted={isMuted} />

      <div>
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        <button onClick={reloadPokemon}>Reload Pokémon</button>
      </div>
    </div>
  );
};

export default QuizPage;
