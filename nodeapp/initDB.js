'use strict';

const readline = require ('readline');

// conectamos a la base de datos
const connection = require('./lib/connectMongoose');

//cargar los modelos
const Producto = require('./models/Producto');

async function main () {

    const continuar = await pregunta('Esta seguro que desea BORRAR COMPLETAMENTE la base de datos y cargar los datos por defecto?');
    if (!continuar) {
        process.exit();
    }

    // cargando colección de productos por defecto
    await initProductos();
    connection.close();
}

main().catch(err => console.log('error de tipo: ', err, ' al realizar la inicialización'));

async function initProductos() {
    // primero borraremos la DB existente
    const deleted = await Producto.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} Productos de la base de datos.`);

    // Productos para la base de datos inicial
    const inserted = await Producto.insertMany([
        { name: 'Bicicleta', venta: true, precio: 230.15, foto: './images/BicicletaElectrica.jpg',  tags: ['lifestyle', 'motor']},
        { name: 'iphone 12 pro max', venta: false, precio: 800, foto: './images/iphone12.jpg', tags: ['lifestyle', 'mobile'] },
        { name: 'Asus Rog Strix', venta: true, precio: 950, foto: './images/AsusROG.jpg', tags: ['work', 'lifestyle', 'mobile'] },
        { name: 'patinete XIAOMI', venta: true, precio: 300, foto: './images/Patinetexiaomi.jpg', tags: ['lifestyle', 'motor'] }
    ]);
    console.log(`Creados ${inserted.length} Pproductos para nuestra base de datos`);
}

function pregunta(texto) {
    return new Promise((resolve, reject) => {
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        ifc.question(texto, respuesta => {
            ifc.close();
            if (respuesta.toLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        })
    });
}