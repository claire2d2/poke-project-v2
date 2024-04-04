import { useRef, useState } from "react";
import useTeam from "../../context/usePoke";

const ResetButton = () => {
  const { setCurrTeam, isEmpty } = useTeam();

  // if checkbox for reset has already been checked, set initial value to "true"

  let initialResetCheck = false;
  const resetInfoChecked = localStorage.getItem("resetInfoChecked");
  if (resetInfoChecked !== null) {
    initialResetCheck = JSON.parse(resetInfoChecked);
  }
  const [resetCheck, setResetCheck] = useState<boolean>(initialResetCheck);

  // modal will pop-up if reset button is clicked
  const resetModal = useRef<HTMLDialogElement | null>(null);

  const resetTeam = () => {
    closeResetModal();
    setCurrTeam([]);
  };

  function openResetModal() {
    if (resetCheck) {
      resetTeam();
      return;
    }
    resetModal.current?.showModal();
  }
  function closeResetModal() {
    resetModal.current?.close();
  }

  // ensure modal doesn't pop up again if checkbox has been checked

  function handleResetCheck() {
    setResetCheck(true);
    localStorage.setItem("resetInfoChecked", JSON.stringify("true"));
  }
  return (
    <div>
      <button
        disabled={isEmpty}
        onClick={openResetModal}
        className="bg-orange-400 p-1 rounded-lg text-white hover:bg-orange-500 transition-all  active:bg-orange-700 active:font-semibold disabled:bg-gray-200"
      >
        Reset
      </button>

      <dialog ref={resetModal} className="p-4 text-center">
        <h3 className="font-bold text-2xl">Are you sure?</h3>
        <p className="text-xl m-6">This action is irreversible!</p>
        <div className="mt-2">
          <input
            type="checkbox"
            name="reset-team-info"
            id="reset-team"
            className="cursor-pointer"
            onChange={handleResetCheck}
          />
          <label htmlFor="reset-team">Don't show this to me again</label>
        </div>
        <div className="mb-1 flex gap-4 justify-center text-white">
          <button
            onClick={resetTeam}
            className="bg-green-700 px-2 py-1 rounded-lg hover:bg-green-800 active:bg-green-900"
          >
            Got it
          </button>
          <button
            onClick={closeResetModal}
            className="bg-rose-400 px-2 py-1 rounded-lg hover:bg-rose-500 active:bg-rose-700"
          >
            Never mind
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ResetButton;
