import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import axios from "axios";
import api from "../../services/api";

import "./style.css";
import logo from "../../assets/logo.svg";

interface Item {
  id: number;
  titulo: string;
  imagem: string;
}

interface Uf {
  sigla: string;
}

interface Cidade {
  nome: string;
}

const PontoCriar = () => {
  const [itens, setItens] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  const [positionAtual, setPositionAtual] = useState<[number, number]>([0, 0]);

  const [ufselected, setUfselected] = useState("0");
  const [cidadeselected, setCidadeselected] = useState("0");
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [selectedItens, setSelectedItens] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
  });

  const history = useHistory();

  // capturando a localização atual do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPositionAtual([latitude, longitude]);
    });
  });

  // carregamento dos itens
  useEffect(() => {
    api.get("itens").then((response) => {
      setItens(response.data);
      console.log(response.data);
    });
  }, []);

  // carregamento de estados
  useEffect(() => {
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const estados = response.data.map((uf) => uf.sigla);
        setUfs(estados);
      });
  }, []);

  // carreagamento das cidades baseadas no estado
  useEffect(() => {
    if (ufselected === "0") {
      return;
    }

    axios
      .get<Cidade[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufselected}/municipios`
      )
      .then((response) => {
        const cidades = response.data.map((cidade) => cidade.nome);
        setCidades(cidades);
      });
  }, [ufselected]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setUfselected(uf);
  }

  function handleSelectedCiadade(event: ChangeEvent<HTMLSelectElement>) {
    const cidade = event.target.value;
    setCidadeselected(cidade);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const itensSelecionados = selectedItens.findIndex((item) => item === id);

    if (itensSelecionados >= 0) {
      const filtrarItens = selectedItens.filter((item) => item !== id);
      setSelectedItens(filtrarItens);
    } else {
      setSelectedItens([...selectedItens, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { nome, email, whatsapp } = formData;
    const uf = ufselected;
    const cidade = cidadeselected;
    const [latitude, longitude] = position;
    const itens = selectedItens;

    const data = {
      nome,
      email,
      whatsapp,
      uf,
      cidade,
      latitude,
      longitude,
      itens,
    };
    console.log(data);
    
    api.post("pontos", data);
    alert("Ponto cadastrado com sucesso");
    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="" />

        <Link to="/">
          <FiArrowLeft /> Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="nome">Nome da Entidade</label>
            <input
              type="text"
              name="nome"
              id="nome"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          {/* Mapa  */}
          <Map center={positionAtual} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Este Local Está Selecionado</Popup>
            </Marker>
          </Map>
          {/* Mapa  */}

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estados</label>
              <select
                name="uf"
                id="uf"
                value={ufselected}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione uma Uf</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cidade">Cidades</label>
              <select
                name="cidade"
                id="cidade"
                value={cidadeselected}
                onChange={handleSelectedCiadade}
              >
                <option value="0">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
            <span>Selecione um ou mais itens para coleta</span>
          </legend>

          <ul className="items-grid">
            {itens.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItens.includes(item.id) ? "selected" : ""}
              >
                <img src={item.imagem} alt={item.titulo} />
                <span>{item.titulo}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar um ponto de coleta</button>
      </form>
    </div>
  );
};

export default PontoCriar;
