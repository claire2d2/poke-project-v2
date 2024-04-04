import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />

      <div className="Outlet overflow-auto no-scrollbar h-full">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
