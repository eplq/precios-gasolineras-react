import { Marker, Popup, useMap } from "react-leaflet";
import { Icon, polygon as makePolygon } from "leaflet";
import { useEffect, useState } from "react";

import markerImg from 'leaflet/dist/images/marker-icon.png';
//                                              x axis middle, y axis bottom

export default function Markers(props) {
    const map = useMap();
    const [gasolinerasPreciosNormalizados, setGasolinerasPreciosNormalizados] = useState([]);
    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);

    useEffect(() => {
        const gasolinerasMap = props.gasolineras.map(element => {
            element["PrecioProducto"] = parseFloat(element["PrecioProducto"].replace(",", "."));
            return element;
        });
        setGasolinerasPreciosNormalizados(gasolinerasMap);
    }, [props.gasolineras, setGasolinerasPreciosNormalizados]);

    useEffect(() => {
        if (gasolinerasPreciosNormalizados.length > 0) {
            setMin(Math.min(...gasolinerasPreciosNormalizados.map(element => element['PrecioProducto'])));
            setMax(Math.max(...gasolinerasPreciosNormalizados.map(element => element['PrecioProducto'])));
        }
    }, [setMin, setMax, gasolinerasPreciosNormalizados]);

    let markers = gasolinerasPreciosNormalizados.map((element, index) => {
        let position = [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")];

        let icon = new Icon({
            iconUrl: markerImg,
            iconAnchor: [25/2, 41] // 25x41
        });

        return (
            <Marker key={index} position={position} icon={icon}>
                <Popup>
                    <p>{element['Rótulo']}</p>
                    <p>{element['PrecioProducto']} &euro;</p>
                </Popup>
            </Marker>
        );
    });
    
    let polygon = makePolygon(props.gasolineras.map(element => [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")]),
        {
            color: 'transparent',
            interactive: false
        }
    ); // trick for getting the center between n points, buggy sometimes

    if (props.gasolineras.length > 0) {
        let center = polygon.addTo(map).getCenter();
        map.setView(center, 11);
    }

    return markers;
}
