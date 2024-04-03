import React, { useEffect, useState } from "react";
import { PokeData } from "../../components/OnePokeData";
import pokeApi from "../../service/pokeApi";
import addTeam from "../../context/usePoke";

const ChosenPoke: React.FC<{ id: number }> = ({ id }) => {
  const [pokeData, setPokeData] = useState<PokeData | null>(null);

  useEffect(() => {
    fetchPokeData();
  }, [id]);

  async function fetchPokeData() {
    try {
      const { data } = await pokeApi.get<PokeData>(`/pokemon/${id}`);
      setPokeData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // add to team

  // import context for adding the current pokemon to the current team
  const { currTeam, setCurrTeam, teamFull } = addTeam();

  //TODO show message when added succesfully!
  function addTeamMemb() {
    if (teamFull) {
      return;
    }
    setCurrTeam([...currTeam, id]);
    return 1;
  }

  return (
    <div
      className={`group bg-white w-full p-3 rounded-xl shadow-md flex flex-col justify-center items-center text-center${
        teamFull ? "border-0" : "hover:border border-orange-500"
      }`}
    >
      <h3 className="text-orange-600 text-xl font-bold capitalize ">
        {pokeData?.species.name}
      </h3>
      <div>
        <img
          className="mx-auto "
          src={pokeData?.sprites.front_default}
          alt="sprite"
        />
      </div>
      <button
        disabled={teamFull}
        onClick={() => addTeamMemb()}
        className="bg-cyan-600 w-3/4 rounded-lg text-white font-semibold hover:bg-cyan-700 disabled:bg-gray-200"
      >
        Add to team
      </button>
    </div>
  );
};

export default ChosenPoke;
