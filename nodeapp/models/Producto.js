const mongoose = require('mongoose');


// definimos el esquema DB para los productos

const productoSchema = mongoose.Schema({
    name: String,
    venta: Boolean,
    Precio: { type: Number, min: 0, max: 1000000},
    foto: String,
    tags: [String]
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;