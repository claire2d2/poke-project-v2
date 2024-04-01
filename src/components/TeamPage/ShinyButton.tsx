import useShiny from "../../context/usePoke";

const ShinyButton = () => {
  const { isShiny, makeItShiny } = useShiny();

  return (
    <div>
      <button
        onClick={makeItShiny}
        className={`rounded-full h-8 w-8 ${
          isShiny
            ? "bg-rose-400 hover:bg-gray-300 active:bg-gray-500 transition-all"
            : "bg-gray-100 hover:bg-rose-300 active:bg-rose-500 transition-all"
        }`}
      >
        ✨
      </button>
    </div>
  );
};

export default ShinyButton;
