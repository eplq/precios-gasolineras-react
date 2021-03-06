import { useEffect, useState } from "react";

export default function useProvincias() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => setList(json))
        .catch(error => console.error(error));
    }, [setList]);

    return list;
}
