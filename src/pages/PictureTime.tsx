import { useState, useEffect } from "react";

import Instruction from "../components/PicturePage/Instruction";
import backendApi from "../service/backendApi";

import mistyImg from "../assets/Misty.png";
import ashImg from "../assets/Ash_Ketchum.png";

const PictureTime = () => {
  const [teamList, setTeamList] = useState<Array<pokeTeam>>([]);
  // get the team names, and team members from the backend API
  async function fetchTeams() {
    try {
      const response = await backendApi.get<Array<pokeTeam>>("/teams");
      setTeamList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTeams();
  }, []);
  //style
  const trainerStyle =
    "h-full w-1/2 p-1 mx-3 rounded-lg bg-blue-200 flex flex-col items-center justify-center";
  const trainerHover = "hover:border-2 hover:border-blue-200 hover:scale-105";
  const trainerTitle = "my-1 font-bold font-xl";

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center text-5xl my-5">It's pikature time!</h1>
      <div className="flex h-1/2 w-full  gap-4 justify-center px-10 text-center">
        <Instruction instrStep={1} stepName="Choose your trainer">
          <div className="flex m-5 h-3/4 justify-center gap-3">
            <button className={`${trainerStyle} ${trainerHover}`}>
              <img src={ashImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>Ash</h4>
            </button>
            <button className={`${trainerStyle} ${trainerHover}`}>
              <img src={mistyImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>Misty</h4>
            </button>
          </div>
          <p>You chose Misty!</p>
        </Instruction>
        <Instruction instrStep={2} stepName="Choose your team">
          <div>
            {teamList ? (
              "There are no teams at the moment ..."
            ) : (
              <select id="teamChange">
                {" "}
                <option value="-1">Choose a team...</option>
                {teamList.map((team) => {
                  return (
                    <option className="capitalize" value={team.id}>
                      {team.name}
                    </option>
                  );
                })}{" "}
              </select>
            )}
          </div>

          <p>You chose team 4!</p>
        </Instruction>
        <Instruction instrStep={3} stepName="Choose your background">
          test test
        </Instruction>
      </div>
      <div className="w-full text-center"> Chheeeeeese!</div>
      <button>Take a picture</button>
    </div>
  );
};

export default PictureTime;
