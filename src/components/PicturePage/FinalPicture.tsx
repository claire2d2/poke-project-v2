import React from "react";

const FinalPicture: React.FC<{
  chosenTrainer: string;
  pokeTeamId: number;
  chosenImg: string;
}> = ({ chosenTrainer, pokeTeamId, chosenImg }) => {
  return (
    <div className="bg-background-1 bg-cover overflow-hidden h-full">
      <div className="overflow-hidden">
        <img
          src={chosenTrainer}
          className="scale-75 absolute top-30 -left-40 p-0 m-0 overflow-hidden"
        />
      </div>
    </div>
  );
};

export default FinalPicture;
