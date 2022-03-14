export const getTipoCarburantes = callback => {
    fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/', {
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    })
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.error(error));
};

export const getProvincias = callback => {
    fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/', {
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    })
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.error(error));
};

export const getMunicipios = (idProvincia, callback) => {
    fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${idProvincia}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    })
    .then(response => response.json())
    .then(json => callback(json))
    .catch(error => console.error(error));
};

export const getGasolineras = (idMunicipio, idTipoCarburante, callback) => {
    fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipioProducto/${idMunicipio}/${idTipoCarburante}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    })
    .then(response => response.json())
    .then(json => callback(json.ListaEESSPrecio))
    .catch(err => console.error(err));
}