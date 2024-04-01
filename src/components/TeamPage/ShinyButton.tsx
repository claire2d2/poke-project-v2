import useShiny from "../../context/usePoke";

const ShinyButton = () => {
  const { isShiny, setIsShiny, makeItShiny } = useShiny();

  return (
    <div>
      <button
        onClick={makeItShiny}
        className={isShiny ? "bg-rose-400" : "bg-gray-100"}
      >
        ✨
      </button>
    </div>
  );
};

export default ShinyButton;
