import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");

  useEffect(() => {
    // Fetch the list of Pokémon from the API
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=386"
        );
        const pokemonData = response.data.results;
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    // Once the list of Pokémon is fetched, select a random Pokémon as the correct answer
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const randomPokemon = pokemonList[randomIndex];
      setCorrectAnswer(randomPokemon.name);
      // Fetch additional data including the image URL
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.name}`)
        .then((response) => {
          setPokemonImage(response.data.sprites.front_default);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon image:", error);
        });
      // Select two additional random Pokémon as incorrect options
      const incorrectOptions = [];
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
      // Shuffle the options (correct + incorrect) for better presentation
      const allOptions = [correctAnswer, ...incorrectOptions];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    }
  }, [pokemonList, correctAnswer]);

  const handleAnswerSelection = (selectedAnswer) => {
    if (selectedAnswer === correctAnswer) {
      // Provide feedback for correct answer
      setFeedback("Great job! You got it right!");
    } else {
      // Provide feedback for incorrect answer
      setFeedback("Uh-oh, better go back to our Pokédex and keep learning!");
    }
  };

  return (
    <div>
      {correctAnswer && options.length === 3 && (
        <div>
          {/* Display the silhouette or visual representation of the Pokémon */}
          <p>Guess the Pokémon:</p>
          <img src={pokemonImage} alt={correctAnswer} />
          {/* Display the three options for the user to choose */}
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleAnswerSelection(option)}>
                {option}
              </li>
            ))}
          </ul>
          {/* Display feedback */}
          <p>{feedback}</p>
        </div>
      )}
      {/* Placeholder until Pokémon data is fetched */}
      {!correctAnswer && <p>Loading...</p>}
    </div>
  );
};

export default QuizPage;
