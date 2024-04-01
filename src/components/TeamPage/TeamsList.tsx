import { useState, useEffect, useRef } from "react";
import backendApi from "../../service/backendApi";

// import team components
import SmallSprite from "./SmallSprite";
import editIcon from "../../assets/edit_team.png";

// import style
import { TeamTitle } from "./TeamPageStyle";

// import global state
import useTeam from "../../context/usePoke";

type pokeTeam = {
  id: number;
  name: string;
  archived: boolean;
  isShiny: boolean;
  members: Array<number>;
};

const TeamsList = () => {
  const { currTeam, setCurrTeam, setTeamToEdit, setIsShiny } = useTeam();

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

  // when clicking on edit icon, set current team to the team, set archived to false

  async function updateTeams(id) {
    try {
      const response = await backendApi.patch(`/teams/${id}`, {
        archived: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function editTeam(id: number) {
    try {
      // sets trying to edit team to archived: false so that it doesn't appear in the teams list
      const archiveResponse = await backendApi.patch(`/teams/${id}`, {
        archived: false,
      });
      // getting the relevant team info to set the chosen team to display
      const teamResponse = await backendApi.get<Array<pokeTeam>>(
        `/teams/${id}`
      );
      setCurrTeam(teamResponse.data.members);
      setIsShiny(teamResponse.data.isShiny);
      setTeamToEdit(teamResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = (id: number) => {
    teamList.forEach((team) => {
      updateTeams(team.id);
    });
    editTeam(id);
  };
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
    <div className="TeamsList h-3/4 overflow-scroll no-scrollbar">
      <TeamTitle>List of teams</TeamTitle>
      {teamList.length === 0
        ? "No teams at the moment ..."
        : teamList
            ?.filter((team) => team.archived === true)
            .map((team) => {
              return (
                <div className="pl-5 pr-2" key={team.id}>
                  <h3 className="font-bold capitalize text-blue-800 my-1 drop-shadow-sm">
                    {team.name} :
                  </h3>
                  <div className="relative flex py-2 items-center group bg-white rounded-xl hover:bg-orange-100 shadow-md">
                    {/* button to delete team if possible, only visible when hovering on the team */}
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="absolute m-0 top-0 right-3 text-gray-500 font-bold hidden group-hover:inline hover:text-red-500"
                    >
                      x
                    </button>

                    <div className="flex items-center">
                      {team.members.map((member: number) => {
                        return (
                          <SmallSprite
                            pokeId={Number(member)}
                            shinyState={team.isShiny}
                          />
                        );
                      })}
                    </div>
                    {/* edit button */}
                    <button
                      onClick={() => handleEdit(team.id)}
                      className="scale-50 bg-gray-500 hover:bg-orange-500 p-1 rounded-lg transition-all"
                    >
                      <img src={editIcon} className="p-1" />
                    </button>
                    {/* //! dialog when trying to delete team here */}
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
                  </div>
                </div>
              );
            })}
    </div>
  );
};

export default TeamsList;
