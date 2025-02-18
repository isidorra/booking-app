import { LoaderIcon } from "react-hot-toast";
import useGetReservationsByRole from "../../hooks/reservation/useGetReservationsByRole";
import ReservationCard from "./ReservationCard";
import { useReservationsContext } from "../../context/ReservationsContext";
import Pagination from "../../components/layout/Pagination";

const GuestReservations = () => {
  const { loading, reservations } = useGetReservationsByRole();
  const { currentPage, setCurrentPage } = useReservationsContext();

  return (
    <div>
      <h2 className="font-semibold text-xl sm:text-2xl">My Reservations</h2>

      {loading && <LoaderIcon />}
      {!loading && (!reservations || reservations.length === 0) && (
        <p className="mt-2 opacity-90">No reservations.</p>
      )}
      {!loading &&
        reservations &&
        reservations.map((reservation) => (
          <ReservationCard reservation={reservation} key={reservation.id} />
        ))}

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default GuestReservations;
