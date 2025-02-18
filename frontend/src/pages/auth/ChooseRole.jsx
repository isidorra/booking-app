import RoleCard from "../../components/auth/RoleCard";
import hostIcon from "../../assets/host.png";
import guestIcon from "../../assets/guest.png";
const ChooseRole = () => {
  return (
    <div className="max-w-[1000px] pt-16 px-5 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-10">
      <RoleCard
        title={"Find Your Perfect Stay"}
        description={
          "From city escapes to hidden gems, find and book your perfect stay."
        }
        role={"guest"}
        cta={"Start exploring"}
        icon={guestIcon}
      />
      
      <RoleCard
        title={"Share Your Space"}
        description={
          "Got a spare space? Turn it into income by hosting travelers worldwide."
        }
        role={"host"}
        cta={"Become a Host"}
        icon={hostIcon}
      />
    </div>
  );
};

export default ChooseRole;
