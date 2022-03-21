import { useEffect } from "react";
import useList from "./useList";

export default function useProvincias() {
    const { list, setList } = useList();

    useEffect(() => {
        /*https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/ */
        fetch('http://localhost/provincias.php', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => setList(json))
        .catch(error => console.error(error));

        return () => setList([]);
    }, [list, setList]);

    return list;
}
