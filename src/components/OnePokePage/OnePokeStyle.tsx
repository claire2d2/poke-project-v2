import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const PokeAttr: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="my-1 flex flex-col pr-2">
      <span className="font-semibold mr-3">{title}:</span> {children}
    </div>
  );
};

export const NavButton: React.FC<{
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
