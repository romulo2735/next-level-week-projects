import Leaflet from "leaflet";
import mapMarkerImg from "../images/logo-market.svg";

// Configuração do icone no mapa.
const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

export default mapIcon;