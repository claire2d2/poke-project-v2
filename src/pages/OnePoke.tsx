import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OnePoke = () => {
  // use state to get the wanted pokemon from the pokemonlist? state
  const [poke, setPoke] = useState<string>("");

  // get the pokemon name from the url
  const pokeName = useParams();

  return (
    <div>
      This will be the page where we show the data for one specific pokemon!
    </div>
  );
};

export default OnePoke;
