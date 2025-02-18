import { MdOutlineDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
const PlaceFeature = ({ icon, name, number, boolean }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-5 py-2">
      <p className="text-xl sm:text-3xl">{icon}</p>
      {number && (
        <p className="text-sm sm:text-base">
          {number} {number > 1 ? `${name}s` : name}
        </p>
      )}
      {boolean !== undefined &&
        (boolean ? (
          <p className="flex items-center gap-1 text-sm sm:text-base">
            {name} <MdOutlineDone />
          </p>
        ) : (
          <p className="flex items-center gap-1 text-sm sm:text-base">
            {name} <IoMdClose />{" "}
          </p>
        ))}
    </div>
  );
};

export default PlaceFeature;
