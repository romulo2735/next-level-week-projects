import React from "react";
import {Link} from 'react-router-dom';

import {FiArrowRight} from "react-icons/fi";

import "../styles/global.css";
import "../styles/Pages/landing.css";
import Logo from "../images/logo.svg";


function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={Logo} alt="Happy"/>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </div>

                <Link className='enter-app' to="/orphanages/map">
                    <FiArrowRight size={26} color="rgba(0,0,0, 0.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Landing;