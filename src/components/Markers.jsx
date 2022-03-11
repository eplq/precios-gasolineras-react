import { useMap } from "react-leaflet";
import { useState } from "react";

export default function Markers(props) {

    const [lastMunicipio, setLastMunicipio] = useState('280');

    if (props.municipio !== lastMunicipio) {
        console.log("municipio cambiado " + props.municipio);
        setLastMunicipio(props.municipio);
    }

    const map = useMap();
    console.log(map.setView([0, 0], 5));
    return null;
}