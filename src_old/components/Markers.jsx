import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon, polygon as makePolygon } from "leaflet";
import markerImg from 'leaflet/dist/images/marker-icon.png';

import useList from "../hooks/useList";
//                                              x axis middle, y axis bottom
const icon = new Icon({ iconUrl: markerImg, iconAnchor: [25/2, 41]});

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
            // 25x41
            return (
                <Marker key={index} position={position} icon={icon}>
                    <Popup>
                        <p>{element['Rótulo']}</p>
                        <p>{element['PrecioProducto']} &euro;</p>
                    </Popup>
                </Marker>
            );
        });
    
    let polygon = makePolygon(gasolinerasList
        .getList()
        .map(element => [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")]),
        {
            color: 'transparent',
            interactive: false
        }
    );

    if (gasolinerasList.getLength() > 0) {
        let layer = polygon.addTo(map);
        console.log(layer);
        let center = layer.getCenter();
        map.setView(center, 11);
    }

    return markers;
}