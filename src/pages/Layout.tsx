import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
