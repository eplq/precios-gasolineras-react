import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { obtenerProvincias, obtenerTipoCarburantes } from "../api";

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
        this.getProvincias();
        this.getTipoCarburantes();
    }

    getProvincias() {
        obtenerProvincias(json => {
            this.setState({
                listaProvincias: json
            });
        });
    }

    getTipoCarburantes() {
        obtenerTipoCarburantes(json => {
            this.setState({
                listaTipoCarburantes: json
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
                            <select className="w-full" name="Provincia" id="selectProvincia">
                                {
                                    this.state.listaProvincias
                                    .map(element => <option key={element.IDPovincia} value={element.IDPovincia}>{capitalize(element.Provincia.toLowerCase())}</option>)
                                }
                            </select>
                            <label htmlFor="selectMunicipio">Municipio</label>
                            <select className="w-full" name="Municipio" id="selectMunicipio">
                                {
                                    this.state.listaMunicipios
                                    .map(element => <option key={element.IDMunicipio} value={element.IDMunicipio}>{capitalize(element.Municipio.toLowerCase())}</option>)
                                }
                            </select>
                            <label htmlFor="selectTipoCarburante">Tipo de carburante</label>
                            <select className="w-full" name="TipoCarburante" id="selectTipoCarburante">
                                {
                                    this.state.listaTipoCarburantes
                                    .map(element => <option key={element.IDProducto} value={element.IDProducto}>{element.NombreProducto}</option>)
                                }
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