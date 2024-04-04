import React, { useState, useEffect, useCallback, useRef } from "react";
import { toPng } from "html-to-image";

import PokePoser from "./PokePoser";

import { pokeTeam } from "../TeamData";
import { fetchOneTeam } from "../TeamData";

const FinalPicture: React.FC<{
  chosenTrainer: string;
  pokeTeamId: number;
  chosenImg: string;
  closeModal: () => void;
}> = ({ chosenTrainer, pokeTeamId, chosenImg, closeModal }) => {
  // base for generating image
  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  // get Team data

  const [team, setTeam] = useState<pokeTeam | null>(null);

  useEffect(() => {
    fetchOneTeam(pokeTeamId, setTeam);
  }, [pokeTeamId]);

  if (!team) {
    return <div>Loading picture ...</div>;
  }
  return (
    <div className="p-5">
      <div
        ref={ref}
        style={{ height: "500px", width: "800px" }}
        className="Picture relative overflow-hidden w-full mt-3 mx-5"
      >
        <img
          src={chosenImg}
          alt="background image"
          className="object-cover h-full w-full"
        />
        <div className="pokemon absolute top-20 left-0 scale-50">
          <PokePoser pokeId={team.members[0]} isShiny={team.isShiny} />
        </div>
        <div className="pokemon absolute top-20 left-20 scale-50">
          <PokePoser pokeId={team.members[1]} isShiny={team.isShiny} />
        </div>
        <div className="pokemon absolute top-20 left-40 scale-50">
          <PokePoser pokeId={team.members[2]} isShiny={team.isShiny} />
        </div>
        <div className="pokemon absolute top-20 left-60 scale-50">
          <PokePoser pokeId={team.members[3]} isShiny={team.isShiny} />
        </div>
        <div className="pokemon absolute top-20 -right-0 scale-50">
          <PokePoser pokeId={team.members[4]} isShiny={team.isShiny} />
        </div>
        <div className="pokemon absolute top-20 -right-20 scale-50">
          <PokePoser pokeId={team.members[5]} isShiny={team.isShiny} />
        </div>
        <div className="trainer">
          <img
            src={chosenTrainer}
            alt="trainer"
            className="absolute -bottom-40 -left-20 h-full scale-150"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <h3 className="text-4xl font-bold text-center">Wonderful!</h3>
        <p className="text-2xl">Do you want to save your picture?</p>
        <div className="flex gap-4 my-3">
          <button
            onClick={onButtonClick}
            className="bg-green-800 text-white font-semibold text-xl px-4 py-2"
          >
            Save picture
          </button>
          <button
            onClick={closeModal}
            className="bg-yellow-600 text-white text-xl px-4 py-2"
          >
            Take another picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalPicture;
