import { Link } from "react-router-dom";

const Navbar = () => {
  return (

    <div className="navbar top-0 w-full h-75px bg-blue-900 text-white flex items-center">
      <Link to="/pokemon">
        <h1 className="mx-auto">Pokemon GET</h1>
      </Link>

    </div>
  );
};

export default Navbar;
