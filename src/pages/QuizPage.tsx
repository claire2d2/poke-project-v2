import React, { useState, useEffect } from "react";
import whoIsThatPokemonSound from "../../public/who-s-that-pokemon.mp3";
import backgroundImage from "../../public/who-s-that-pokemon-bg.jpeg";
import TrainQuiz from "../components/QuizPage/TrainQuiz";
import ScoreQuiz from "../components/QuizPage/ScoreQuiz";

function playWhoIsThatPokemonSound(isMuted: boolean) {
  if (!isMuted) {
    new Audio(whoIsThatPokemonSound).play();
  }
}

const QuizPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("score");

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  const handlePlayClick = () => {
    setShowModal(false);
    playWhoIsThatPokemonSound(isMuted);
  };

  return (
    <div className="parent-div-QuizPage-includes-modal h-full">
      {showModal && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="fixed z-10 h-full w-full bg-cover rounded-2xl"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="absolute inset-0 bg-gray-500 opacity-75 rounded-2xl"></div>

            <div className="align-bottom bg-white rounded-lg text-left overflow-hidden transform p-10 flex flex-col gap-5">
              <div className="bg-white">
                <div className="text-center">
                  <h3 className="text-lg font-press-start font-medium text-gray-900 mb-5">
                    Who's that Pokémon?!
                  </h3>
                  <div className="flex flex-col gap-3 text-center">
                    <p className="text-sm">
                      Chose your play mode and click the play button below to
                      start the quiz!
                    </p>
                    <p className="text-sm">
                      (Don't forget to click the mute button if you're not in
                      the mood for sound)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center">
                <select
                  className="rounded-full"
                  onChange={handleModeChange}
                  value={mode}
                >
                  <option value="score">Score Quiz</option>
                  <option value="train">Train Quiz</option>
                </select>
                <button
                  onClick={handlePlayClick}
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Play
                </button>
                <button
                  onClick={toggleMute}
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showModal && (
        <div className="div-from-QuizPage-containing components h-full">
          {mode === "score" ? <ScoreQuiz /> : <TrainQuiz />}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
