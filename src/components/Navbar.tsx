import { useNavigate } from "react-router-dom";
import pokeLogo from "../assets/poke_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // style variables
  const linkStyle = "font-semibold";
  const hoverLink =
    "hover:text-yellow-400 hover:font-bold hover:cursor-pointer";
  return (
    <nav className="w-screen md:h-nav bg-blue-900 text-white flex flex-row justify-between items-center p-2 md:px-6 rounded-b-xl">
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

      {/* {menu} */}
      <div>
        <ul className="hidden md:flex md:flex-row">
          <li
            onClick={() => navigate("/team")}
            className={`${linkStyle} ${hoverLink} w-36 text-center font-press-start text-xs border-r`}
          >
            Your Team
          </li>
          <li
            onClick={() => navigate("/pikature")}
            className={`${linkStyle} ${hoverLink} w-56 text-center font-press-start text-xs border-r`}
          >
            Take a pika-ture
          </li>
          <li
            onClick={() => navigate("/quiz")}
            className={`${linkStyle} ${hoverLink} w-36 text-center font-press-start text-xs`}
          >
            PokeQuiz
          </li>
        </ul>
      </div>

      {/* hamburger menu */}
      <div className="md:hidden">
        <button className="space-y-1 group md:hidden p-2">
          <div className="w-6 h-1 bg-white rounded-full"></div>
          <div className="w-6 h-1 bg-white rounded-full"></div>
          <div className="w-6 h-1 bg-white rounded-full"></div>

          {/* menu */}

          <ul className="absolute -top-full right-0 group-focus:top-0 duration-150 flex flex-col space-y-3 justify-end bg-blue-900 w-full z-10 p-2 m-0 rounded-b-xl">
            <div className="flex justify-between">
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
              <button className="px-10 py-8 relative ml-auto">
                <div className="w-6 h-1 rotate-45 absolute bg-white rounded-full"></div>
                <div className="w-6 h-1 -rotate-45 absolute bg-white rounded-full"></div>
              </button>
            </div>
            <li
              onClick={() => navigate("/team")}
              className={`${linkStyle} ${hoverLink} md:w-28 text-center flex justify-center w-full py-4 font-press-start`}
            >
              Your Team
            </li>
            <li
              onClick={() => navigate("/pikature")}
              className={`${linkStyle} ${hoverLink} md:w-36 text-center flex justify-center w-full py-4 font-press-start`}
            >
              Take a pika-ture
            </li>
            <li
              onClick={() => navigate("/quiz")}
              className={`${linkStyle} ${hoverLink} m:dw-24 text-center flex justify-center w-full py-4 font-press-start`}
            >
              PokeQuiz
            </li>
          </ul>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
