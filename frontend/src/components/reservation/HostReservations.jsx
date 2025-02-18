import { format } from "date-fns";
import useGetReservationsByRole from "../../hooks/reservation/useGetReservationsByRole";
import { LoaderIcon } from "react-hot-toast";
import {useReservationsContext} from "../../context/ReservationsContext";
import Pagination from "../../components/layout/Pagination";

const HostReservations = () => {
  const { loading, reservations } = useGetReservationsByRole();
  const {currentPage, setCurrentPage} = useReservationsContext();

  return (
    <div className="max-container">
      <h1 className="text-xl sm:text-2xl font-semibold">Reservations</h1>

      {loading && <LoaderIcon />}
      {!loading && (!reservations || reservations.length === 0) && (
        <p className="mt-2 opacity-90">No reservations.</p>
      )}
      <table className="w-full rounded-xl mt-2 text-xs sm:text-base mx-auto flex flex-col sm:block justify-center">
        <thead>
          <tr className="text-left">
            <th className="p-1 sm:p-2 bg-secondary/10 rounded-tl-xl">Place</th>
            <th className="p-1 sm:p-2 bg-secondary/10">Guest</th>
            <th className="p-1 sm:p-2 bg-secondary/10">Check in</th>
            <th className="p-1 sm:p-2 bg-secondary/10">Check out</th>
            <th className="p-1 sm:p-2 bg-secondary/10">Number of guests</th>
            <th className="p-1 sm:p-2 bg-secondary/10 rounded-tr-xl">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            reservations &&
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="p-1 sm:p-2 border border-secondary/20">
                  {reservation.place.city}, {reservation.place.name}
                </td>
                <td className="p-1 sm:p-2 border border-secondary/20">
                  {reservation.guest.firstName} {reservation.guest.lastName}
                </td>
                <td className="p-1 sm:p-2 border border-secondary/20">{format(new Date(reservation.checkInDate), "MMMM dd, yyyy")}</td>
                <td className="p-1 sm:p-2 border border-secondary/20">{format(new Date(reservation.checkOutDate), "MMMM dd, yyyy")}</td>
                <td className="p-1 sm:p-2 border border-secondary/20">{reservation.guestNumber}</td>
                <td className="p-1 sm:p-2 border border-secondary/20">{reservation.totalPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>

    </div>
  );
};

export default HostReservations;
