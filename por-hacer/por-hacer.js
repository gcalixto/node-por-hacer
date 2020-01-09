const fs = require('fs');

let listadoPorHacer = [];

// Con la funcion JSON.stringify se puede pasar un string a un archivo json valido
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);


    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) throw new Error('No se puedo guaradr', err);

    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    // push agregar el objeto al arreglo
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer


}


const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // con la funcion findindex me trae la posicion de la tarea que estouy consultando
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true
    } else {
        return false
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index >= 0) {
        listadoPorHacer = listadoPorHacer.filter(e => e.descripcion !== descripcion);
        guardarDB();
        return true
    } else {
        return false
    }



}


module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}