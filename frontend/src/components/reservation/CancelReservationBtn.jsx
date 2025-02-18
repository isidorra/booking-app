import { LoaderIcon } from "react-hot-toast";
import useCancelReservation from "../../hooks/reservation/useCancelReservation";

const CancelReservationBtn = ({ reservationId }) => {
  const { loading, deleteReservation } = useCancelReservation();

  const handleClick = async () => {
    await deleteReservation(reservationId);
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-red-400 py-2 px-4 rounded-lg text-primary"
    >
      {loading ? <LoaderIcon /> : <span>Cancel Reservation</span>}
    </button>
  );
};

export default CancelReservationBtn;
