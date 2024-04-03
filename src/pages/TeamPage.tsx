//import context
import useTeam from "../context/usePoke";

import { DragEvent } from "react";

// import relevant components

import TeamMember from "../components/TeamPage/TeamMember";
import HandleTeam from "../components/TeamPage/HandleTeam";
import FindPoke from "../components/TeamPage/FindPoke";
import ResetButton from "../components/TeamPage/ResetButton";
import ShinyButton from "../components/TeamPage/ShinyButton";

const TeamPage = () => {
  const { currTeam, setCurrTeam, isShiny } = useTeam();

  const emptyTeam = [];

  for (let i = 0; i < 6 - currTeam.length; i++) {
    emptyTeam.unshift({ num: 0, index: 5 - i });
  }

  // test drag and drop

  function handleOnDragOver(e: DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  function handleOnDrop(e: DragEvent<HTMLElement>, index: number) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    swapPoke(data, index);
  }

  function swapPoke(fromPokeIndex: number, toPokeIndex: number) {
    const copy = [...currTeam];
    const fromPoke = copy[fromPokeIndex];
    const toPoke = copy[toPokeIndex];

    if (fromPoke && toPoke) {
      copy[fromPokeIndex] = toPoke;
      copy[toPokeIndex] = fromPoke;
    }

    setCurrTeam(copy);
  }

  return (
    <div className="TeamPage flex h-full w-full items-stretch">
      <div
        // bar the expands when hovering on it
        className="FindPokemon group md:w-1/6 md:bg-gray-200 md:hover:w-1/6 transition-all"
      >
        <div className="hidden md:group-hover:block transition-all">
          <FindPoke />
        </div>
      </div>
      <div className="TeamView relative overflow-scroll no-scrollbar h-full w-full md:basis-2/3 flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-around md:justify-center">
        <div className="absolute top-2 right-2">
          {/* 
          Button to make sprites shiny 
          */}
          <ShinyButton />
        </div>

        {currTeam.map((poke: number, index: number) => {
          return (
            <div
              key={index}
              className="lg:basis-1/4 "
              onDrop={(e) => handleOnDrop(e, index)}
              onDragOver={handleOnDragOver}
            >
              <TeamMember pokeId={poke} teamIndex={index} isShiny={isShiny} />
            </div>
          );
        })}
        {currTeam.length < 6
          ? emptyTeam.map((emp) => {
              return (
                <div key={emp.index} className="lg:basis-1/4 ">
                  <TeamMember
                    pokeId={emp.num}
                    teamIndex={emp.index}
                    isShiny={isShiny}
                  />
                </div>
              );
            })
          : ""}
        <div className="md:absolute md:bottom-2 md:right-2">
          {/*
           Reset button 
          */}
          <ResetButton />
        </div>
      </div>
      <div className="HandleTeam hidden md:basis-1/3 md:flex md:h-full">
        <HandleTeam />
      </div>
    </div>
  );
};

export default TeamPage;
