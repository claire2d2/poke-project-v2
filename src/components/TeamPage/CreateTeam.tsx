// import use state and API
import { useState, ChangeEvent, MouseEvent } from "react";
import useTeam from "../../context/usePoke";
import backendApi from "../../service/backendApi";

// import style
import { TeamTitle } from "./TeamPageStyle";

type pokeTeam = {
  name: string;
  archived: boolean;
  isShiny: boolean;
  members: Array<number>;
};

const CreateTeam = () => {
  const { currTeam, setCurrTeam, isShiny, setIsShiny } = useTeam();
  const [teamName, setTeamName] = useState<string>("");

  // TODO if name exists, error!

  // post to backend API when clicking on save button
  async function addTeam(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    // if team isn't full return (button is disabled, but just in case)
    if (currTeam.length < 6) {
      return;
    }
    try {
      await backendApi.post<pokeTeam>(`/teams`, {
        name: teamName,
        archived: true,
        isShiny: isShiny,
        members: currTeam,
      });
      // empty current team when submitting
      setCurrTeam([]);
      setIsShiny(false);
      setTeamName("");
    } catch (error) {
      console.log(error);
    }
  }

  // handle the input changes for setting the new team name

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTeamName(value);
  };

  return (
    <div className="CreateTeam">
      <div className="w-full">
        <TeamTitle>Create a team</TeamTitle>
        <div className="p-5">
          <div className="mb-3 font-semibold text-lg">
            <label htmlFor="team-name">Your team's name:</label>
          </div>
          <input
            className="w-3/4 p-1"
            id="team-name"
            type="text"
            placeholder="ex: Team Rocket"
            value={teamName}
            onChange={handleName}
          />
          <button
            // button is disabled if team is incomplete
            disabled={currTeam.length < 6 ? true : false}
            className="tex-xs mx-1 bg-orange-500 disabled:bg-gray-400 hover:bg-orange-700 text-white font-bold p-1 rounded-lg"
            onClick={addTeam}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
