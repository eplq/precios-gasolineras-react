import React from "react";

export default class App extends React.Component {

    constructor() {
        this.state = {
            listaTipoCarburantes: [],
            listaProvincias: [],
            listaMunicipios: [],
            idTipoCarburante: '1', // Gasolina 95 E5
            idProvincia: '02', // Albacete
            idMunicipio: '280' // Abla
        };
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
                            <select className="w-full" name="Provincia" id="selectProvincia" onChange={ev => setIdProvincia(ev.target.value)}>
                                {
                                    listaProvincias
                                    .getList()
                                    .map(element => <option key={element.IDPovincia} value={element.IDPovincia}>{capitalize(element.Provincia.toLowerCase())}</option>)
                                }
                            </select>
                            <label htmlFor="selectMunicipio">Municipio</label>
                            <select className="w-full" name="Municipio" id="selectMunicipio" onChange={ev => setIdMunicipio(ev.target.value)}>
                                {
                                    listaMunicipios
                                    .getList()
                                    .map(element => <option key={element.IDMunicipio} value={element.IDMunicipio}>{capitalize(element.Municipio.toLowerCase())}</option>)
                                }
                            </select>
                            <label htmlFor="selectTipoCarburante">Tipo de carburante</label>
                            <select className="w-full" name="TipoCarburante" id="selectTipoCarburante" onChange={ev => setIdTipoCarburante(ev.target.value)}>
                                {
                                    listaTipoCarburantes
                                    .getList()
                                    .map(element => <option key={element.IDProducto} value={element.IDProducto}>{element.NombreProducto}</option>)
                                }
                            </select>
                        </div>
                    </div>

                    <div className="self-center">
                        <p>debug</p>
                        <p>provincia: {idProvincia}</p>
                        <p>municipio: {idMunicipio}</p>
                        <p>carburante: {idTipoCarburante}</p>
                    </div>
                </div>
                <div className="h-full flex-1">
                    <MapContainer center={[40.4169, -3.7035]} zoom={8} className="z-10 h-full">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Markers municipio={idMunicipio} tipoCarburante={idTipoCarburante}/>
                    </MapContainer>
                </div>
            </main>
        );
    }
}