import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Markers from "./Markers";
import useCarburantes from "../hooks/useCarburantes";
import useGasolineras from "../hooks/useGasolineras";
import useMunicipios from "../hooks/useMunicipios";
import useProvincias from "../hooks/useProvincias";
import { capitalize } from "../utils";

export default function App() {

    const [idMunicipio, setIdMunicipio] = useState('280'); // Abla
    const [idProvincia, setIdProvincia] = useState('02'); // Albacete
    const [idTipoCarburante, setIdTipoCarburante] = useState('1'); // Gasolina 95 E5

    const listaTipoCarburantes = useCarburantes();
    const listaProvincias = useProvincias();
    const listaMunicipios = useMunicipios(idProvincia);
    const listaGasolineras = useGasolineras(idMunicipio, idTipoCarburante);

    return (
        <main className="flex h-screen w-screen">
            <div className="border-r-2 border-r-slate-800 h-full w-1/3 md:w-1/5 p-3 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl text-center mb-2">Precios de los hidro<wbr />carburos</h1>
                    <p className="mb-4">Seleccione un municipio</p>

                    <div className="w-full">
                        <label htmlFor="selectProvincia">Provincia</label>
                        <select className="w-full" name="Provincia" id="selectProvincia" onChange={ev => setIdProvincia(ev.target.value)}>
                            {
                                listaProvincias.map(element => <option key={element.IDPovincia} value={element.IDPovincia}>{capitalize(element.Provincia.toLowerCase())}</option>)
                            }
                        </select>
                        <label htmlFor="selectMunicipio">Municipio</label>
                        <select className="w-full" name="Municipio" id="selectMunicipio" onChange={ev => setIdMunicipio(ev.target.value)}>
                            {
                                listaMunicipios.map(element => <option key={element.IDMunicipio} value={element.IDMunicipio}>{capitalize(element.Municipio.toLowerCase())}</option>)
                            }
                        </select>
                        <label htmlFor="selectTipoCarburante">Tipo de carburante</label>
                        <select className="w-full" name="TipoCarburante" id="selectTipoCarburante" onChange={ev => setIdTipoCarburante(ev.target.value)}>
                            {
                                listaTipoCarburantes.map(element => <option key={element.IDProducto} value={element.IDProducto}>{element.NombreProducto}</option>)
                            }
                        </select>
                    </div>
                </div>
                <p className="text-center">Made with love by <a className="text-orange-500 underline hover:text-orange-300 active:text-orange-400" href="https://github.com/eplq">eplq</a></p>
            </div>
            <div className="h-full flex-1">
                <MapContainer center={[40.4169, -3.7035]} zoom={8} className="z-10 h-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers gasolineras={listaGasolineras}/>
                </MapContainer>
            </div>
        </main>
    );
}
