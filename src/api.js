const obtenerTipoCarburantes = () => {
    if (!tipoCarburantesFetched.current) {
        fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => listaTipoCarburantes.setList(json))
        .catch(error => console.error(error));
        tipoCarburantesFetched.current = true;
    }
};

const obtenerProvincias = () => {
    if (!provinciasFetched.current) {
        fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/', {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => listaProvincias.setList(json))
        .catch(error => console.error(error));

        provinciasFetched.current = true;
    }
};

const obtenerMunicipios = () => {
    if (idProvincia !== lastProvincia.current) {
        fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${idProvincia}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
        })
        .then(response => response.json())
        .then(json => listaMunicipios.setList(json))
        .catch(error => console.error(error));
        lastProvincia.current = idProvincia;
    }
};
