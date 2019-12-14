const { argv } = require('./config/yargs');
const colors = require('colors/safe');
const { crear, getListado, actualizar, borrar, getListadof } = require('./por-hacer/por-hacer');

let comando = argv._[0];

// console.log(argv);
// console.log(argv.descripcion);

// return;
switch (comando) {
    case 'crear':

        let tarea = crear(argv.descripcion);
        console.log(tarea);

        break;
    case 'listar':

        let listado = getListado();
        // console.log(listado);
        console.log(colors.green('===========Por Hacer=========='));
        for (let tarea of listado) {

            let cadena = colors.bold(`tarea: `) + colors.white(`${tarea.descripcion}`) + colors.bold(` status: `);

            if (tarea.completado === 'true')
                cadena += colors.green(`${tarea.completado}`)
            else
                cadena += colors.red(`${tarea.completado}`)
            console.log(cadena);

        }
        console.log(colors.green('=============================='));
        break;
    case 'listarf':

        let listadof = getListadof(argv.completado);
        console.log(argv.completado);
        if (argv.completado === 'true')
            console.log(colors.green('===========Realizadas=========='));
        else
            console.log(colors.green('===========Por Hacer==========='));
        for (let tarea of listadof) {

            let cadena = colors.bold(`tarea: `) + colors.white(`${tarea.descripcion}`) + colors.bold(` status: `);

            if (tarea.completado === 'true')
                cadena += colors.green(`${tarea.completado}`)
            else
                cadena += colors.red(`${tarea.completado}`)
            console.log(cadena);
        }
        console.log(colors.green('=============================='));
        break;
    case 'actualizar':
        //console.log('actualizar');
        let actualizado = actualizar(argv.descripcion, argv.completado);
        if (actualizado)
            console.log('se ha actualizado el registro');
        else
            console.log('NO se ha actualizado el registro');

        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        if (borrado)
            console.log('se ha borrado el registro');
        else
            console.log('NO se ha borrado el registro');
        break;
    default:
        console.log(`comando ${comando} no reconocido`);
        break;
}