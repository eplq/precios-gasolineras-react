import { useEffect, useState } from "react";

export default function useGasolineras(municipio, tipoCarburante) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/${municipio}/${tipoCarburante}`)
            .then(response => response.json())
            .then(json => setList(json.ListaEESSPrecio))
            .catch(err => console.error(err));
    }, [setList, municipio, tipoCarburante])

    return list;
}