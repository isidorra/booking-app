import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { DateRangePicker } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoTicket } from "react-icons/io5";
import useGetReservedDaysByPlace from "../../hooks/reservation/useGetReservedDaysByPlace";
import useCreateReservation from "../../hooks/reservation/useCreateReservation";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { addDays, parseISO } from "date-fns";

const CreateReservationCard = ({ placeId, pricePerNight, maxGuestNumber }) => {
  const { authUser } = useAuthContext();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [guestNumber, setGuestNumber] = useState(1);
  const { loading, reservedDays } = useGetReservedDaysByPlace(placeId);
  const { loading: loadingCreate, createReservation } = useCreateReservation();
  const navigate = useNavigate();

  const [range, setRange] = useState({
    startDate: tomorrow,
    endDate: addDays(tomorrow, 1),
    key: "selection",
  });
  const disabledDates = reservedDays ? reservedDays.map((date) => parseISO(date)) : [];


  const handleCalendarChange = (ranges) => {
    let { startDate, endDate } = ranges.selection;

    if (startDate < tomorrow) {
      startDate = tomorrow;
    }

    if (startDate.toDateString() === endDate.toDateString()) {
      endDate = addDays(startDate, 1);
    }

    while (disabledDates.some(date => date.toDateString() === startDate.toDateString()) ||
           disabledDates.some(date => date.toDateString() === endDate.toDateString())) {
      endDate = addDays(endDate, 1);
    }

    setRange({ startDate, endDate, key: "selection" });
  };

  const handleSubmit = async () => {
    // Convert the start and end dates to UTC
    const localStartDate = range.startDate;
    const localEndDate = range.endDate;

    // Convert to UTC by adjusting for the local timezone
    const utcStartDate = new Date(localStartDate.getTime() - localStartDate.getTimezoneOffset() * 60000);
    const utcEndDate = new Date(localEndDate.getTime() - localEndDate.getTimezoneOffset() * 60000);

    console.log("Start Date (Local):", localStartDate);
    console.log("End Date (Local):", localEndDate);

    const success = await createReservation(
      placeId,
      utcStartDate.toISOString(),
      utcEndDate.toISOString(),
      guestNumber,
      maxGuestNumber
    );

    if (success) {
      navigate("/reservations");
    }
  };



  const totalDays = Math.round((range.endDate - range.startDate) / (1000 * 60 * 60 * 24));
  const totalPrice = totalDays * pricePerNight;

  return (
    <div className="p-5 md:p-10 rounded-lg bg-primary drop-shadow-xl flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl flex items-center gap-1">
          <span className="text-accent-purple">
            <IoTicket />
          </span>{" "}
          Make a reservation
        </h2>
        <p>${pricePerNight} per night</p>
      </div>

      {authUser ? (
        <div className="mt-5">
          <div className="my-2">
            <label className="uppercase font-medium block">
              Number of guests
            </label>
            <input
              type="number"
              min={1}
              max={maxGuestNumber}
              value={guestNumber}
              onChange={(ev) => setGuestNumber(ev.target.value)}
              className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            />
          </div>

          <div className="flex items-center gap-5">
            <p>
              <span className="font-semibold">Check-in:</span>{" "}
              {range.startDate.toDateString()}
            </p>
            <p>-</p>
            <p>
              <span className="font-semibold">Check-out:</span>{" "}
              {range.endDate.toDateString()}
            </p>
          </div>

          <p className="font-semibold mt-3 py-3 border-t border-secondary/20">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <div className="flex justify-center mt-5">
            <DateRangePicker
              ranges={[range]}
              onChange={handleCalendarChange}
              color="#A287F4"
              rangeColors={["#A287F4"]}
              minDate={tomorrow}
              maxDate={addDays(new Date(), 365)}
              showPreview={false}
              showDateDisplay={true}
              inputRanges={[]}
              staticRanges={[]}
              disabledDates={disabledDates}
            />
          </div>

          <button
            disabled={loadingCreate}
            onClick={handleSubmit}
            className="bg-accent-purple text-primary w-full py-2 rounded-lg uppercase text-lg mt-5 hover:bg-accent-green duration-200"
          >
            {loadingCreate ? <LoaderIcon className="mx-auto"/> : <span>Reserve</span>}
          </button>
        </div>
      ) : (
        <Link
          to={"/register/guest"}
          className="bg-accent-purple py-2 mt-24 w-full block rounded-lg text-primary text-center hover:bg-accent-green duration-200"
        >
          Sign Up To Reserve
        </Link>
      )}
    </div>
  );
};

export default CreateReservationCard;