import GuestReservations from "../../components/reservation/GuestReservations";
import HostReservations from "../../components/reservation/HostReservations";
import { useAuthContext } from "../../context/AuthContext";


const Reservations = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="max-container">
      {(authUser && authUser.role === "Host") ? <HostReservations/> : <GuestReservations/>}
    </div>
  );
};

export default Reservations;
