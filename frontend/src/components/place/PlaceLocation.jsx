import { MapContainer, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon, popup } from "leaflet";
import { Marker } from "react-leaflet";
import customIcon from "../../assets/custom-marker.png";

const PlaceLocation = ({lat, lng}) => {
    const marker = {
        geocode: [lat, lng],
        popup: "The full address will be visible after you make a reservation."
    }

    const markerIcon = new Icon ({
        iconUrl: customIcon,
        iconSize: [35, 35]
    });
  return (
    <div>
        <MapContainer center={[lat, lng]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={marker.geocode} icon={markerIcon}>
                <Popup>
                    {marker.popup}
                </Popup>
            </Marker> 
        </MapContainer>

    </div>
  )
}

export default PlaceLocation