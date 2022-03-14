export const obtenerTipoCarburantes = callback => {
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

export const obtenerProvincias = callback => {
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

export const obtenerMunicipios = callback => {
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
