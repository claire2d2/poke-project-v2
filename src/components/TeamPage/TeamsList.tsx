import { useState, useEffect, useRef } from "react";
import backendApi from "../../service/backendApi";

// import team components
import SmallSprite from "./SmallSprite";
import editIcon from "../../assets/edit_team.png";
import deleteIcon from "../../assets/delete_team.png";

// import global state
import useTeam from "../../context/usePoke";

type pokeTeam = {
  name: string;
  archived: boolean;
  members: Array<number>;
};

const TeamsList = () => {
  const { currTeam } = useTeam();

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
  }, [currTeam]);

  // use state to determine which is the current team to delete
  const [teamToDel, setTeamToDel] = useState<number | null>(null);
  // delete teams when clicking on delete button
  async function deleteTeam(id: number) {
    try {
      const response = await backendApi.delete<Array<pokeTeam>>(`/teams/${id}`);
      console.log(response);
      fetchTeams();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (id: number) => {
    setTeamToDel(id);
    openDeleteModal();
  };

  // dialog to confirm that user does want to delete a team
  const deleteModal = useRef();

  function openDeleteModal() {
    deleteModal.current.showModal();
  }
  function closeDeleteModal() {
    deleteModal.current.close();
  }

  return (
    <div className="TeamsList h-3/4  px-3 overflow-scroll no-scrollbar bg-green-200">
      <h2 className="text-xl font-bold my-2">List of teams</h2>
      {teamList.length === 0
        ? "No teams at the moment ..."
        : teamList
            ?.filter((team) => team.archived === true)
            .map((team) => {
              return (
                <div className key={team.id}>
                  <h3 className="font-semibold">
                    {team.name} {team.id}
                  </h3>
                  <div className="relative group bg-orange-100 border border-solid border-gray-50 rounded-xl hover:bg-orange-200">
                    {/* button to delete team if possible, only visible when hovering on the team */}
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="absolute right-2 text-gray-500 text-xl font-bold hidden group-hover:block hover:text-red-500"
                    >
                      x
                    </button>
                    <dialog
                      key={team.id}
                      ref={deleteModal}
                      className="relative p-5 bg-red-50 shadow-md text-center"
                    >
                      <button
                        onClick={closeDeleteModal}
                        className="absolute right-3 top-0 text-red-400 text-sm font-bold"
                      >
                        x
                      </button>
                      <h2 className="font-semibold my-3">
                        Are you sure you want to delete this team?
                      </h2>
                      <p>This action is irreversible!</p>
                      <div className="flex items-center justify-center gap-4 m-3">
                        <button
                          onClick={() => deleteTeam(teamToDel)}
                          className="bg-gray-300 px-3 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                        >
                          Yes
                        </button>
                        <button
                          onClick={closeDeleteModal}
                          className="bg-gray-300 px-3 rounded-lg hover:bg-red-400 hover:text-white transition-all"
                        >
                          No
                        </button>
                      </div>
                    </dialog>
                    <div className="flex items-center">
                      {team.members.map((member: number) => {
                        return <SmallSprite pokeId={Number(member)} />;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  );
};

export default TeamsList;
