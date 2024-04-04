import { useContext } from "react";
import { PokeContext } from "./PokeContextWrapper";

const usePoke = () => {
  const context = useContext(PokeContext);

  if (context === null) {
    throw new Error("usePoke must be used within a PokeContextProvider");
  }

  return context;
};

export default usePoke;
