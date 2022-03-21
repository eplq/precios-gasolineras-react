import { useState, useEffect } from "react";

export default function useMunicipios(provincia) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${provincia}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => setList(json))
        .catch(error => console.error(error));
    }, [setList, provincia]);

    return list;
}