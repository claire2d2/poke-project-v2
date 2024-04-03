import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const NavButton: React.FC<{
  color: string;
  disabled: boolean;
  navTo: string;
  children: ReactNode;
}> = ({ color, disabled, navTo, children }) => {
  const navigate = useNavigate();
  return (
    <button
      disabled={disabled}
      onClick={() => navigate(navTo)}
      className={`transition-all bg-${color}-500 hover:bg-${color}-500 text-white  font-bold py-2 px-4 rounded-full disabled:bg-gray-300`}
    >
      {children}
    </button>
  );
};

export default NavButton;
