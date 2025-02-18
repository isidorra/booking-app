import { FaHouseChimney } from "react-icons/fa6";
import { MdApartment} from "react-icons/md";
import { GiGate } from "react-icons/gi";
import { MdBungalow } from "react-icons/md";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { LuTent } from "react-icons/lu";
import { FaSailboat } from "react-icons/fa6";
import { FaTree } from "react-icons/fa";
import { PiFarm } from "react-icons/pi";

export const placeTypes = [
    { id: 0, name: "House", icon: <FaHouseChimney/> },
    { id: 1, name: "Apartment", icon:  <MdApartment/>},
    { id: 2, name: "Villa", icon:  <GiGate/>},
    { id: 3, name: "Bungalow", icon: <MdBungalow/> },
    { id: 4, name: "Penthouse", icon:  <BsStars/>},
    { id: 5, name: "Beach House",  icon: <FaUmbrellaBeach/>},
    { id: 6, name: "Tent", icon:  <LuTent />},
    { id: 7, name: "Tree House", icon: <FaTree />},
    { id: 8, name: "Houseboat", icon: <FaSailboat /> },
    { id: 9, name: "Farmhouse", icon:  <PiFarm />},
];

