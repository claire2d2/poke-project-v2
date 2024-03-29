import TeamMember from "../components/TeamMember";

const TeamPage = () => {
  // test array to see if it works
  const testArray = [1, 25, 25, 25, 25, 25];

  return (
    <div>
      {testArray.map((id: number) => {
        return (
          <div key={id}>
            <TeamMember pokeId={id} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamPage;

//reuse the pokecard component and setting up logic in place so that
//all favorited pokemons are passed as props
//--> array for favorites that is limited to length 6?
