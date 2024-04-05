import { MouseEvent } from "react";
import useMute from "../../context/usePoke";

const MuteButton = () => {
  const { isMuted, toggleMute } = useMute();

  const muteButton = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault;
    toggleMute(isMuted);
  };

  return (
    <div>
      <button
        onClick={muteButton}
        type="button"
        className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default MuteButton;
