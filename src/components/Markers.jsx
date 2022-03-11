import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import useList from "../hooks/useList";
import { Icon } from "leaflet";

import markerImg from '../img/marker.png';

const icon = new Icon({ iconUrl: markerImg});

export default function Markers(props) {

    const [lastMunicipio, setLastMunicipio] = useState('280');
    const [lastTipoCarburante, setLastTipoCarburante] = useState('1');
    const gasolinerasList = useList();
    const map = useMap();

    const update = () => {
        if (props.municipio !== lastMunicipio || props.tipoCarburante !== lastTipoCarburante) {
            console.log("municipio cambiado " + props.municipio);
            setLastMunicipio(props.municipio);

            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/${props.municipio}/${props.tipoCarburante}`)
            .then(response => response.json())
            .then(json => gasolinerasList.setList(json.ListaEESSPrecio))
            .catch(err => console.error(err));

            setLastMunicipio(props.municipio);
            setLastTipoCarburante(props.tipoCarburante);
        }
    }
    useEffect(update);

    let markers = gasolinerasList
        .getList()
        .map((element, index) => {
            let position = [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")];
            return (
                <Marker key={index} position={position} icon={icon}>
                    <Popup children={
                        <>
                            <p>{element['Rótulo']}</p>
                            <p>{element['PrecioProducto']} &euro;</p>
                        </>
                    } />
                </Marker>
            );
        });

    // console.log(map.setView([0, 0], 5));
    return markers;
}