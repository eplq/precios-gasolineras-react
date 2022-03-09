import { MapContainer, TileLayer } from "react-leaflet";
import useList from "../hooks/useList";
import { capitalize } from "../utils";

export default function App() {

    const listaTipoCarburantes = useList();
    const listaProvincias = useList();
    const listaMunicipios = useList();

    const obtenerTipoCarburantes = () => 
        fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            // mode: ''
        })
        .then(response => response.json())
        .then(json => listaTipoCarburantes.setList(json))
        .catch(error => console.error(error));
    
    const obtenerProvincias = () => 
        fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            // mode: ''
        })
        .then(response => response.json())
        .then(json => listaProvincias.setList(json))
        .catch(error => console.error(error));

    const obtenerMunicipios = (idProvincia = '04') => 
        fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${idProvincia}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            // mode: ''
        })
        .then(response => response.json())
        .then(json => listaMunicipios.setList(json))
        .catch(error => console.error(error));
    

    if (listaProvincias.getLength() == 0)
        obtenerProvincias();

    if (listaMunicipios.getLength() == 0)
        obtenerMunicipios();

    if (listaTipoCarburantes.getLength() == 0)
        obtenerTipoCarburantes();

    return (
        <main className="flex h-screen w-screen">
            <div className="border-r-2 border-r-slate-800 h-full w-1/3 md:w-1/5 p-3">
                <h1 className="text-2xl text-justify mb-2">Precios de los hidrocarburos</h1>
                <p className="mb-4">Seleccione un municipio</p>

                <div className="w-full">
                    <label htmlFor="selectProvincia">Provincia</label>
                    <select className="w-full" name="Provincia" id="selectProvincia" onChange={ev => obtenerMunicipios(ev.target.value)}>
                        {
                            listaProvincias
                            .getList()
                            .map(element => <option key={element.IDPovincia} value={element.IDPovincia}>{capitalize(element.Provincia.toLowerCase())}</option>)
                        }
                    </select>
                    <label htmlFor="selectMunicipio">Municipio</label>
                    <select className="w-full" name="Municipio" id="selectMunicipio">
                        {
                            listaMunicipios
                            .getList()
                            .map(element => <option key={element.IDMunicipio} value={element.IDMunicipio}>{capitalize(element.Municipio.toLowerCase())}</option>)
                        }
                    </select>
                    <label htmlFor="selectTipoCarburante">Tipo de carburante</label>
                    <select className="w-full" name="TipoCarburante" id="selectTipoCarburante">
                        {
                            listaTipoCarburantes
                            .getList()
                            .map(element => <option key={element.IDProducto} value={element.IDProducto}>{element.NombreProducto}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="h-full flex-1">
                <MapContainer center={[40.43, -3.70]} zoom={13} className="z-10 h-full">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </main>
    );
}