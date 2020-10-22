import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FiPlus, FiArrowRight} from "react-icons/fi";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

import LogoMarker from "../images/logo-market.svg";
import mapIcon from "../utils/mapIcon";

import "../styles/Pages/orphanages-map.css";
import service from "../services/service";
import OrphanageInterface from "../interfaces/OrphanageInterface";

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([]);

    useEffect(() => {
        service.get('orphanages').then(res => {
            setOrphanages(res.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={LogoMarker} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </footer>
            </aside>
            <Map center={[-3.7906755, -38.537535]} zoom={15} style={{width: '100%', height: '100%'}}>
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

                {orphanages.map(orphange => {
                    return (
                        <Marker key={orphange.id} icon={mapIcon} position={[orphange.latitude, orphange.longitude]}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphange.name}
                                <Link to={`/orphanage/${orphange.id}`}>
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>
            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;