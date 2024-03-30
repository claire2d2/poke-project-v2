import sadPikachu from "../../assets/sad-pikachu.gif";
import { useNavigate } from "react-router-dom";

const OutsidePerim = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-full w-full text-center">
      <div className="mx-auto">
        <h2 className="text-4xl w-full m-8 tracking-wider font-bold hover:text-5xl transition-all">
          We're sorry!
        </h2>
        <div className="w-full align-center items-center">
          <img className="mx-auto" src={sadPikachu} alt="sad pikachu gif" />
        </div>
        <p className="text-3xl m-5 text-gray-600 font-semibold">
          This website currently only shows pokémon from gen 1 to gen 3!
        </p>
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-500 rounded"
          onClick={() => navigate("/pokemon")}
        >
          Search for another pokémon
        </button>
      </div>
    </div>
  );
};

export default OutsidePerim;
