import { useState, useEffect, useRef, ChangeEvent } from "react";

import Instruction from "../components/PicturePage/Instruction";
import backendApi from "../service/backendApi";

import ShowChosenTeam from "../components/PicturePage/ShowChosenTeam";
import FinalPicture from "../components/PicturePage/FinalPicture";

import mayImg from "../assets/trainer-may.png";
import brendanImg from "../assets/trainer-brendan.png";
import backgroundOneImg from "../assets/background1.jpg";
import backgroundTwoImg from "../assets/background2.jpg";

type pokeTeam = {
  name: string;
  isShiny: boolean;
  members: Array<number>;
  id: number;
};

type choice = {
  name: string;
  image: string;
};

const PictureTime = () => {
  const [teamList, setTeamList] = useState<Array<pokeTeam>>([]);
  const [chosenTrainer, setChosenTrainer] = useState<choice | null>(null);
  const [chosenTeam, setChosenTeam] = useState<number>(0);
  const [choseBG, setChoseBG] = useState<choice | null>(null);

  const brendan = {
    name: "Brendan",
    image: brendanImg,
  };
  const may = {
    name: "May",
    image: mayImg,
  };

  // set trainer based on user choice
  const choseBrendan = () => {
    setChosenTrainer(brendan);
  };
  const choseMay = () => {
    setChosenTrainer(may);
  };
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

  // listen to which team is being selected
  const handleTeamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const result = e.currentTarget.value;
    setChosenTeam(Number(result));
    console.log(chosenTeam);
  };

  // set background based on user choice

  const bgOne = {
    name: "Route 101",
    image: backgroundOneImg,
  };
  const bgTwo = {
    name: "Forest",
    image: backgroundTwoImg,
  };

  const choseBGOne = () => {
    setChoseBG(bgOne);
  };
  const choseBGTwo = () => {
    setChoseBG(bgTwo);
  };

  //style
  const trainerStyle =
    "h-full w-1/2 p-1 mx-3 rounded-lg  flex flex-col items-center justify-center shadow-lg";
  const trainerHover =
    "hover:border-2 hover:border-blue-200 hover:scale-105 hover:bg-blue-50";
  const trainerTitle = "my-1 font-bold font-xl";

  const bgButtonStyle =
    "group basis-1/4 hover:scale-105 shadow-lg py-3 px-6 rounded-xl w-full flex flex-col justify-center items-center";
  const bgImageStyle =
    "hidden group-hover:block h-3/4 object-cover transition-all";

  // dialog that opens with image when clicking on cheese
  const pictureModal = useRef<HTMLDialogElement | null>(null);

  function openPicModal() {
    pictureModal.current?.showModal();
  }
  function closePicModal() {
    pictureModal.current?.close();
  }

  if (!teamList) {
    return <div>Nope!</div>;
  }
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center text-5xl my-3 text-yellow-500 font-bold">
        It's pikature time!
      </h1>
      <div className="flex h-3/4 w-full my-5  gap-3 justify-center px-10 text-center">
        <Instruction stepName="1. Choose your trainer">
          <div className="flex m-5 h-3/4 justify-center gap-3">
            <button
              className={`${trainerStyle} ${trainerHover}`}
              onClick={choseBrendan}
            >
              <img src={brendanImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>Brendan</h4>
            </button>
            <button
              className={`${trainerStyle} ${trainerHover}`}
              onClick={choseMay}
            >
              <img src={mayImg} alt="" className="h-3/4 object-contain" />
              <h4 className={trainerTitle}>May</h4>
            </button>
          </div>
          {chosenTrainer ? (
            <div className="w-full">
              <p className="text-xl w-full">
                You chose{" "}
                <span className="font-semibold text-2xl">
                  {chosenTrainer.name}
                </span>
              </p>
              <p className="my-2">Good choice!</p>
            </div>
          ) : (
            <p>You haven't chosen a trainer yet</p>
          )}
        </Instruction>
        <Instruction stepName="2. Choose your team">
          <div>
            {!teamList ? (
              "There are no teams at the moment ..."
            ) : (
              <select
                id="teamChange"
                onChange={handleTeamChange}
                className="capitalize text-xl m-3"
              >
                <option value={0}>Choose a team...</option>
                {teamList.map((team) => {
                  return (
                    <option className="capitalize text-xl" value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="my-3">
            {!teamList || chosenTeam === 0 ? (
              "Please choose a team"
            ) : (
              <ShowChosenTeam chosenTeam={chosenTeam} />
            )}
          </div>
        </Instruction>
        <Instruction stepName="3. Choose your background">
          <div className="flex flex-col justify-center items-center gap-5 p-5">
            <button onClick={choseBGOne} className={bgButtonStyle}>
              <img src={backgroundOneImg} alt="" className={bgImageStyle} />
              <h3 className="font-bold text-2xl">Route 101</h3>
            </button>
            <button onClick={choseBGTwo} className={bgButtonStyle}>
              <img src={backgroundTwoImg} alt="" className={bgImageStyle} />
              <h3 className="font-bold text-2xl">Forest</h3>
            </button>
            {choseBG ? (
              <p>You chose {choseBG.name}!</p>
            ) : (
              <p>Please choose a background image</p>
            )}
          </div>
        </Instruction>
      </div>
      <div className="w-full text-center">
        <button
          // disable button if some of the parameters are missing
          disabled={!chosenTrainer || chosenTeam === 0 || !choseBG}
          onClick={openPicModal}
        >
          Cheeese!
        </button>
      </div>

      <dialog ref={pictureModal} className="no-scrollbar">
        <FinalPicture
          chosenTrainer={chosenTrainer?.image ? chosenTrainer.image : ""}
          pokeTeamId={chosenTeam}
          chosenImg={choseBG ? choseBG.image : ""}
          closeModal={closePicModal}
        />
      </dialog>
    </div>
  );
};

export default PictureTime;
