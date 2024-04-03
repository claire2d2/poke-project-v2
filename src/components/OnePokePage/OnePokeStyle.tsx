import React, { ReactNode } from "react";

export const PokeAttr: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="my-1 flex items-center">
      <span className="font-semibold mr-3">{title}:</span> {children}
    </div>
  );
};
