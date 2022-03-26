import { useMap } from "react-leaflet";
import { polygon as makePolygon } from "leaflet";

import useMarcadoresEESS from "../hooks/useMarcadoresEESS";

export default function Markers(props) {
    const map = useMap();
    const markers = useMarcadoresEESS(props.gasolineras);
    
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
