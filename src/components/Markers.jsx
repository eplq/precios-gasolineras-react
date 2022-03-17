import { Marker, Popup, useMap } from "react-leaflet";
import { Icon, polygon as makePolygon } from "leaflet";
import markerImg from 'leaflet/dist/images/marker-icon.png';
//                                              x axis middle, y axis bottom
const icon = new Icon({ iconUrl: markerImg, iconAnchor: [25/2, 41]});

export default function Markers(props) {
    const gasolineras = props.gasolineras;
    const map = useMap();

    let markers = gasolineras.map((element, index) => {
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
    
    let polygon = makePolygon(gasolineras.map(element => [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")]),
        {
            color: 'transparent',
            interactive: false
        }
    ); // trick for getting the center between n points

    if (gasolineras.getLength() > 0) {
        let layer = polygon.addTo(map);
        console.log(layer);
        let center = layer.getCenter();
        map.setView(center, 11);
    }

    return markers;
}