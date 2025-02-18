import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PlacesContextProvider } from "./context/PlacesContext.jsx";
import {ReservationsContextProvider} from "./context/ReservationsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PlacesContextProvider>
          <ReservationsContextProvider>
            <App />
          </ReservationsContextProvider>
        </PlacesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
