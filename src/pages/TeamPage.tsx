//import context
import useTeam from "../context/usePoke";

// import relevant components

import TeamMember from "../components/TeamPage/TeamMember";
import HandleTeam from "../components/TeamPage/HandleTeam";
import FindPoke from "../components/TeamPage/FindPoke";

const TeamPage = () => {
  const { currTeam, setCurrTeam } = useTeam();

  let emptyTeam: Array = [];

  for (let i = 0; i < 6 - currTeam.length; i++) {
    emptyTeam.unshift({ num: 0, index: 5 - i });
  }

  return (
    <div className="TeamPage flex h-full w-full items-stretch">
      <div
        // bar the expands when hovering on it
        className="FindPokemon group w-5 bg-gray-200 hover:w-1/6 transition-all"
      >
        <div className=" hidden group-hover:block transition-all">
          <FindPoke />
        </div>
      </div>
      <div className="TeamView overflow-scroll no-scrollbar h-full w-full md:basis-2/3 flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-around md:justify-center">
        {currTeam.map((poke: number, index: number) => {
          return (
            <div key={index} className="lg:basis-1/4 ">
              <TeamMember pokeId={poke} teamIndex={index} />
            </div>
          );
        })}
        {currTeam.length < 6
          ? emptyTeam.map((emp) => {
              return (
                <div key={emp.index} className="lg:basis-1/4 ">
                  <TeamMember pokeId={emp.num} teamIndex={emp.index} />
                </div>
              );
            })
          : ""}
      </div>
      <div className="HandleTeam hidden md:basis-1/3 md:flex md:h-full">
        <HandleTeam />
      </div>
    </div>
  );
};

export default TeamPage;

//reuse the pokecard component and setting up logic in place so that
//all favorited pokemons are passed as props
//--> array for favorites that is limited to length 6?
