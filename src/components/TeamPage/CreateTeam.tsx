import backendApi from "../../service/backendApi";
import { useState } from "react";
import useTeam from "../../context/usePoke";

type newTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const CreateTeam = () => {
  const { currTeam, setCurrTeam } = useTeam();
  const [teamName, setTeamName] = useState<string>("");

  // TODO if name exists, error!

  async function saveTeam(e) {
    e.preventDefault();
    console.log(currTeam);
    try {
      const response = await backendApi.post<newTeam>(`/teams`, {
        name: teamName,
        archived: true,
        members: currTeam,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleName = (e) => {
    const value = e.target.value;
    setTeamName(value);
  };
  return (
    <div className="flex flex-col bg-blue-100 h-full content-center">
      <div className="h-1/2 bg-red-200">
        <h1 className="font-bold text-2xl">Create a team</h1>
        <div>
          <label htmlFor="team-name">Your team's name:</label>
          <input
            id="team-name"
            type="text"
            placeholder="ex: Team Rocket"
            value={teamName}
            onChange={handleName}
          />
          <button onClick={saveTeam}>Save</button>
        </div>
      </div>
      <div>
        <div className="TeamsList px-3">
          <h2 className="text-xl font-bold my-2">List of teams</h2>
          <p>There are no teams at the moment ...</p>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
