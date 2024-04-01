import pokeballGif from "../../assets/pokeball-loading.gif";
import { useState, useEffect } from "react";

const LoadingPage = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // use set timeout to display message after 3 seconds
    const timeOutId = setTimeout(() => {
      setMessage("Are you sure this pokémon exists?");
    }, 3000);
    return () => clearTimeout(timeOutId);
  });
  return (
    <div className="h-full flex items-center">
      <div className="flex flex-col h-3/5 mx-auto text-center">
        <div className="mx-auto h-2/5 flex items-center">
          <img
            src={pokeballGif}
            alt="gif of pokeball turning"
            className="h-2/5 object-scale-down"
          />{" "}
          <h1 className="text-center text-6xl text-gray-400 italic ">
            Loading ...
          </h1>
        </div>
        <p className="text-3xl text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
