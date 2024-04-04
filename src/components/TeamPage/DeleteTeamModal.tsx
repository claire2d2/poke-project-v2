interface DeleteTeamModalProps {
  teamId: number;
  teamToDel: number | null;
  closeDeleteModal: (id: number | null) => void; // Function to close the modal
  deleteTeam: (id: number | null) => Promise<void>; // Function to delete the team
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({
  teamId,
  teamToDel,
  closeDeleteModal,
  deleteTeam,
}) => {
  return (
    <div>
      <button
        onClick={() => closeDeleteModal(teamId)}
        className="absolute right-3 top-0 text-red-400 text-sm font-bold"
      >
        x
      </button>
      <h2 className="font-semibold my-3">
        Are you sure you want to delete this team?
      </h2>
      <p>This action is irreversible!</p>
      <div className="flex items-center justify-center gap-4 m-3">
        <button
          onClick={() => deleteTeam(teamToDel)}
          className="bg-gray-300 px-3 rounded-lg hover:bg-green-500 hover:text-white transition-all"
        >
          Yes
        </button>
        <button
          onClick={() => closeDeleteModal(teamId)}
          className="bg-gray-300 px-3 rounded-lg hover:bg-red-400 hover:text-white transition-all"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
