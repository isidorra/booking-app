
const PlaceType = ({placeType}) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="text-lg md:text-xl">{placeType.icon}</div>
        <p className="text-xs md:text-sm text-center">{placeType.name}</p>
    </div>
  )
}

export default PlaceType