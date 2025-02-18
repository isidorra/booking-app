import { format } from "date-fns";
import { IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import CancelReservationBtn from "./CancelReservationBtn";
import PlaceLocation from "../place/PlaceLocation";

const ReservationCard = ({ reservation }) => {
  const { authUser } = useAuthContext();

  // Calculate the difference between checkInDate and today's date
  const today = new Date();
  const checkInDate = new Date(reservation.checkInDate);
  const daysBeforeCheckIn = (checkInDate - today) / (1000 * 3600 * 24); // Difference in days

  // Check if cancellation is allowed (3 or more days before check-in and checkInDate not passed)
  const canCancel = daysBeforeCheckIn >= 3 && checkInDate >= today;

  return (
    <div className="bg-primary drop-shadow-lg p-10 rounded-lg my-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div>
        <h2 className="font-semibold text-xl flex items-center gap-1">
          <span className="text-accent-purple">
            <IoTicket />
          </span>{" "}
          {reservation.place.name}
        </h2>{" "}
        <div className="grid grid-cols-2 gap-3 w-fit mt-5">
          <div className="font-semibold flex flex-col gap-2">
            <p className="flex items-center gap-1"><FaCircleUser/> Reserved by</p>
            <p className="flex items-center gap-1"><FaCalendarAlt/> Check in</p>
            <p className="flex items-center gap-1"><FaCalendarAlt/> Check out</p>
            <p className="flex items-center gap-1"><FaLocationDot /> Address</p>
            <p className="flex items-center gap-1"><FaMapMarkedAlt /> Location</p>
            <p className="flex items-center gap-1"><MdOutlineAttachMoney /> Total price</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              {reservation.guest.firstName} {reservation.guest.lastName}
            </p>
            <p>{format(new Date(reservation.checkInDate), "MMMM dd, yyyy")}</p>
            <p>{format(new Date(reservation.checkOutDate), "MMMM dd, yyyy")}</p>
            <p>{reservation.place.address}</p>
            <p>
              {reservation.place.city}, {reservation.place.country}
            </p>
            <p>${reservation.totalPrice}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-10">
          <Link
            className="bg-secondary/10 py-2 px-4 rounded-lg block"
            to={`/place/${reservation.place.id}`}
          >
            View Place
          </Link>
          {authUser && authUser.role === "Guest" && canCancel && (
            <CancelReservationBtn reservationId={reservation.id} />
          )}
        </div>
      </div>

      <div>
        <PlaceLocation lat={reservation.place.lat} lng={reservation.place.lng}/>
      </div>
    </div>
  );
};

export default ReservationCard;
