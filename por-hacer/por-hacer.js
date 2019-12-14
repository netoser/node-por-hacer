const fs = require('fs');

let listadoPorHacer = [];

// let guardarData = (data) => {
//     return new Promise((resolve, reject) => {

//         fs.writeFile(`db/data.json`, data, (err) => {
//             if (err) {
//                 reject(err);
//                 //throw new Error(err);
//             } else resolve(`Guardado`);
//             // return `tabla-${base}.txt`;
//         });


//     });

// };

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    // guardarData(data);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) {
            throw new Error('No se pudo guardar la data:\n', err);
        }
    });

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;

};

const getListadof = (completado) => {

    cargarDB();
    // console.log(completado);
    let listadoNuevo = listadoPorHacer.filter(tarea => {
        // console.log('\'' + tarea.completado + '\'===\'' + completado + '\'');
        return (tarea.completado) === (completado);
    });

    // console.log(listadoNuevo);

    return listadoNuevo;

};

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
        descripcion, //como se llama igual es el parametro recibido sino se tendria que hacer algo así: desc: descripcion
        completado: false
    };



    listadoPorHacer.push(porHacer);
    guardarDB(listadoPorHacer);
    return porHacer;

};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });



    if (listadoPorHacer.length === listadoNuevo) {
        return false;
    } else {
        listadoPorHacer = listadoNuevo;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    getListadof
};