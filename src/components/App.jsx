import React from "react";

export default class App extends React.Component {

    constructor() {

        this.state = {
            listaTipoCarburantes: [],
            listaProvincias: [],
            listaMunicipios: [],
            idTipoCarburante: '1', // Gasolina 95 E5
            idProvincia: '02', // Albacete
            idMunicipio: '280' // Abla
        };
    }

    render() {
        return null;
    }
}