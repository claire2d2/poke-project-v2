import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import PokeContextWrapper from "./context/PokeContextWrapper.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PokeContextWrapper>
        <App />
      </PokeContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
