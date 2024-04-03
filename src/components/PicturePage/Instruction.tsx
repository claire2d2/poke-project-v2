import React, { ReactNode } from "react";

const Instruction: React.FC<{
  stepName: string;
  children: ReactNode;
}> = ({ stepName, children }) => {
  return (
    <div className="relative bg-white h-full w-1/3 rounded-2xl border-8 border-blue-500 drop-shadow-lg">
      <div className="absolute -top-10 -left-10 border-8 border-blue-500 flex items-center justify-center  text-6xl font-bold text-red-800 bg-white rounded-full w-1/6 h-1/6 text-center drop-shadow-md"></div>
      <h3 className="text-xl font-bold">{stepName}</h3>
      {children}
    </div>
  );
};

export default Instruction;
