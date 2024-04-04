import { useNavigate } from "react-router-dom";
import pokeLogo from "../assets/poke_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // style variables
  const linkStyle = "font-semibold";
  const hoverLink =
    "hover:text-yellow-400 hover:font-bold hover:cursor-pointer";
  return (
    <nav className="w-screen md:h-nav bg-blue-900 text-white flex flex-col md:flex-row justify-between items-center p-2 md:px-6">
      <div className="w-36">
        <img
          onClick={() => {
            navigate("/pokemon");
          }}
          src={pokeLogo}
          alt="site logo"
          className={`${hoverLink}`}
        />
      </div>
      <div>
        <ul className="flex flex-row">
          <li
            onClick={() => navigate("/team")}
            className={`${linkStyle} ${hoverLink} w-28 text-center`}
          >
            Your Team
          </li>
          <li
            onClick={() => navigate("/pikature")}
            className={`${linkStyle} ${hoverLink} w-36 text-center`}
          >
            Take a pika-ture
          </li>
          <li
            onClick={() => navigate("/quiz")}
            className={`${linkStyle} ${hoverLink} w-24 text-center`}
          >
            PokeQuiz
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
