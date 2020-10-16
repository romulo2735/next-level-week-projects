import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {FiArrowDownLeft} from 'react-icons/fi';

import api from "../../services/api";
import './styles.css';
import logo from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {name, email, whatsapp, city, uf};

        try {
            const response = await api.post('ongs', data);
            alert(`ID ONG: ${response.data.ong}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao cadastrar');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastrado, entre na plataforma e ajude pessoa a encontrarem os casos da sua ong</p>

                    <Link className="back-link" to="/">
                        <FiArrowDownLeft size={16} color="#e02041"/> Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Ong"
                           value={name}
                           onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="E-Mail"
                           type="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                           value={whatsapp}
                           onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                               value={city}
                               onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF"
                               value={uf}
                               onChange={e => setUf(e.target.value)}
                               style={{width: 80}}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
