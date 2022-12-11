'use strict';

const readline = require ('readline');

// conectamos a la base de datos
const connection = require('./lib/connectMongoose');

//cargar los modelos
const Producto = require('./models/Producto');
const { Usuario } = require('./models');

async function main () {

    const continuar = await pregunta('Esta seguro que desea BORRAR COMPLETAMENTE la base de datos y cargar los datos por defecto?');
    if (!continuar) {
        process.exit();
    }

    // cargando colección de productos por defecto
    await initProductos();

    // inicializamos la colección de usuarios
    await initUsuarios();

    connection.close();
}

main().catch(err => console.log('error de tipo: ', err, ' al realizar la inicialización'));

async function initUsuarios() {
    // borrar todos los documentos de usuario
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} usuarios.`);
  
    // crear usuarios iniciales
    const inserted = await Usuario.insertMany([
      { email: 'admin@example.com', password: await Usuario.hashPassword('1234') },
      { email: 'user1@example.com', password: await Usuario.hashPassword('1234') },
    ]);
    console.log(`Creados ${inserted.length} usuarios.`);
  }

async function initProductos() {
    // primero borraremos la DB existente
    const deleted = await Producto.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} Productos de la base de datos.`);

    // Productos para la base de datos inicial
    const inserted = await Producto.insertMany([
        { name: 'Bicicleta', venta: true, precio: 230.15, foto: './images/BicicletaElectrica.jpg',  tags: ['lifestyle', 'motor']},
        { name: 'iphone 12 pro max', venta: false, precio: 800, foto: './images/iphone12.jpg', tags: ['lifestyle', 'mobile'] },
        { name: 'Asus Rog Strix', venta: true, precio: 950, foto: './images/AsusROG.jpg', tags: ['work', 'lifestyle', 'mobile'] },
        { name: 'patinete XIAOMI', venta: true, precio: 300, foto: './images/Patinetexiaomi.jpg', tags: ['lifestyle', 'motor'] },
        { name: 'Maquina Alfa', venta: true, precio: 400, foto: './images/alfa-2160.jpg',  tags: ['lifestyle', 'work']},
        { name: 'Monitor Gaming', venta: false, precio:150, foto: './images/monitor.jpg', tags: ['lifestyle', 'work'] },
        { name: 'guitarra Les Paul', venta: true, precio: 900, foto: './images/Lesp.jpg', tags: ['work', 'lifestyle', 'mobile'] }
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