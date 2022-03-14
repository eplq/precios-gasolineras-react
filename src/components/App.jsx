import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import OptionsList from "./OptionsList";
import { getMunicipios, getProvincias, getTipoCarburantes } from "../api";

import { capitalize } from "../utils";

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            listaTipoCarburantes: [],
            listaProvincias: [],
            listaMunicipios: [],
            idTipoCarburante: '1', // Gasolina 95 E5
            idProvincia: '02', // Albacete
            idMunicipio: '280' // Abla
        };
    }

    componentDidMount() {

        getProvincias(json => {
            this.setState({
                listaProvincias: json
            });
        });

        getTipoCarburantes(json => {
            this.setState({
                listaTipoCarburantes: json
            });
        });

        getMunicipios(this.state.idProvincia, json => {
            this.setState({
                listaMunicipios: json
            });
        });
    }

    getGasolineras() {

    }

    onTipoCarburanteChanged(ev) {
        this.setState({idTipoCarburante: ev.target.value});
        this.getGasolineras();
    }

    onMunicipioChanged(ev) {
        this.setState({idMunicipio: ev.target.value});
        this.getGasolineras();
    }

    onProvinciaChanged(ev) {
        let idProvincia = ev.target.value;

        getMunicipios(idProvincia, json => {
            this.setState({
                idProvincia: idProvincia,
                listaMunicipios: json
            });
        });
    }

    render() {
        return (
            <main className="flex h-screen w-screen">
                <div className="border-r-2 border-r-slate-800 h-full w-1/3 md:w-1/5 p-3 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl text-center mb-2">Precios de los hidro<wbr />carburos</h1>
                        <p className="mb-4">Seleccione un municipio</p>
                    
                        <div className="w-full">
                            <label htmlFor="selectProvincia">Provincia</label>
                            <select className="w-full" name="Provincia" id="selectProvincia" onChange={ev => this.onProvinciaChanged(ev)}>
                                <OptionsList list={this.state.listaProvincias} idField="IDProvincia" valueField="Provincia" />
                            </select>
                            <label htmlFor="selectMunicipio">Municipio</label>
                            <select className="w-full" name="Municipio" id="selectMunicipio" onChange={ev => this.onMunicipioChanged(ev)}>
                                <OptionsList list={this.state.listaMunicipios} idField="IDMunicipio" valueField="Municipio" />
                            </select>
                            <label htmlFor="selectTipoCarburante">Tipo de carburante</label>
                            <select className="w-full" name="TipoCarburante" id="selectTipoCarburante" onChange={ev => this.onTipoCarburanteChanged(ev)}>
                                <OptionsList list={this.state.listaTipoCarburantes} idField="IDProducto" valueField="NombreProducto" />
                            </select>
                        </div>
                    </div>

                    <div className="self-center">
                        <p>debug</p>
                        <p>provincia: {this.state.idProvincia}</p>
                        <p>municipio: {this.state.idMunicipio}</p>
                        <p>carburante: {this.state.idTipoCarburante}</p>
                    </div>
                </div>
                <div className="h-full flex-1">
                    <MapContainer center={[40.4169, -3.7035]} zoom={8} className="z-10 h-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* <Markers municipio={this.state.idMunicipio} tipoCarburante={this.state.idTipoCarburante}/> */}
                    </MapContainer>
                </div>
            </main>
        );
    }
}