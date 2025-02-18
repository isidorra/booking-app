import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChooseRole from "./pages/auth/ChooseRole";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "./context/AuthContext";
import HostPlaces from "./pages/place/HostPlaces";
import CreatePlace from "./pages/place/CreatePlace";
import Places from "./pages/place/Places";
import Place from "./pages/place/Place";
import Reservations from "./pages/reservation/Reservations";
import Search from "./pages/search/Search";
axios.defaults.baseURL = "http://localhost:5065";
const App = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Places/>} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/place/:id" element={<Place/>}/>

          {/* Auth */}
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/choose-registration-type"
            element={!authUser ? <ChooseRole /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register/:role"
            element={!authUser ? <Register /> : <Navigate to={"/"} />}
          />

          {/* Host */}
          <Route
            path="/host-places"
            element={
              authUser ? (
                authUser.role === "Host" ? (
                  <HostPlaces />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/new-place"
            element={
              authUser ? (
                authUser.role === "Host" ? (
                  <CreatePlace/>
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />

          {/* Guest and Host */}
          <Route
            path="/reservations"
            element={
              authUser ? (
                (authUser.role === "Guest" || authUser.role === "Host") ? (
                  <Reservations/>
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
