import React from 'react';

import {useHistory} from "react-router-dom";
import LogMarker from "../images/logo-market.svg";
import {FiArrowLeft} from "react-icons/fi";

import "../styles/components/Sidebar.css";

export default function Sidebar() {
    const {goBack} = useHistory();
    return (
        <aside className="app-sidebar">
            <img src={LogMarker} alt="Happy"/>

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF"/>
                </button>
            </footer>
        </aside>
    );
}


