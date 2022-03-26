import { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import cheapImg from '../img/cheap.png';
import cheapNormalImg from '../img/cheapNormal.png';
import normalImg from '../img/normal.png';
import expensiveNormalImg from '../img/expensiveNormal.png';
import expensiveImg from '../img/expensive.png';

export default function useMarcadoresEESS(gasolineras) {

    const [minPrice, setMin] = useState(0);
    const [maxPrice, setMax] = useState(0);
    const [gasolinerasNormalizadas, setGasolinerasNormalizadas] = useState([]);

    useEffect(() => {
        const gasolinerasMap = gasolineras.map(element => {
            element["PrecioProducto"] = parseFloat(element["PrecioProducto"].replace(",", "."));
            return element;
        });
        setGasolinerasNormalizadas(gasolinerasMap);
    }, [gasolineras, setGasolinerasNormalizadas]);

    useEffect(() => {
        if (gasolinerasNormalizadas.length > 0) {
            setMin(Math.min(...gasolinerasNormalizadas.map(element => element['PrecioProducto'])));
            setMax(Math.max(...gasolinerasNormalizadas.map(element => element['PrecioProducto'])));
        }
    }, [setMin, setMax, gasolinerasNormalizadas]);

    return gasolinerasNormalizadas.map((element, index) => {
        let position = [element['Latitud'].replace(",", "."), element['Longitud (WGS84)'].replace(",", ".")];

        let iconImg = expensiveImg;
        if (element['PrecioProducto'] <= minPrice + 0.70*(maxPrice - minPrice))
            iconImg = expensiveNormalImg;

        if (element['PrecioProducto'] <= minPrice + 0.50*(maxPrice - minPrice))
            iconImg = normalImg;

        if (element['PrecioProducto'] <= minPrice + 0.30*(maxPrice - minPrice))
            iconImg = cheapNormalImg;

        if (element['PrecioProducto'] <= minPrice + 0.15*(maxPrice - minPrice))
            iconImg = cheapImg;

        let icon = new Icon({
            iconUrl: iconImg,
            iconAnchor: [25/2, 41]
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
}