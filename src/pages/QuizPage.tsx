import React, { useState, useEffect } from "react";
import axios from "axios";
import whoIsThatPokemonSound from "../../public/who-s-that-pokemon.mp3";

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

const QuizPage: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);

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
  }, [pokemonList, correctAnswer]);

  useEffect(() => {
    if (correctAnswer !== "") {
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
  }, [correctAnswer, pokemonList]);

  const handleAnswerSelection = (selectedAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setFeedback("Great job! You got it right!");
    } else {
      setFeedback("Uh-oh, better go back to our Pokédex and keep learning!");
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
  };

  return (
    <div>
      {correctAnswer && options.length === 3 && (
        <div>
          <p>Who's that Pokémon?</p>
          <img src={pokemonImage} alt={correctAnswer} />
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
      {!correctAnswer && <p>Loading...</p>}
      <div>
        <button onClick={reloadPokemon}>Reload Pokémon</button>
      </div>
      <audio autoPlay={!isMuted} src={whoIsThatPokemonSound} muted={isMuted} />
      <div>
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
      </div>
    </div>
  );
};

export default QuizPage;
