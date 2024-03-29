import profChenImg from "../assets/professor_chen.png";

const HomePage = () => {
  const introParaStyle = "m-5";
  return (
    <div className="HomePage h-full">
      <h1 className="text-center text-4xl m-5">Welcome!</h1>
      <div className="flex">
        <div>
          <img src={profChenImg} alt="image of Professor Chen" />
        </div>
        <div>
          <p className={introParaStyle}>
            This website is for all the Pokémon lovers, the eternal children
            filled with nostalgia and remembering fondly their hours spent
            playing on a poorly lit device, capturing small pixelated pocket
            monsters...
          </p>
          <p className={introParaStyle}>
            Take a trip down memory lane with us! Search and sort through the
            first 3 generations of pokemon. That's 386 pokemon in total, from
            Bulbasaur to Deoxys! And of course, Pikachu's in the lot.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
