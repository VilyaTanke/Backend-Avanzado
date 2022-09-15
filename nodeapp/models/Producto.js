const mongoose = require('mongoose');


// definimos el esquema DB para los productos

const productoSchema = mongoose.Schema({
    name: String,
    venta: Boolean,
    precio: { type: Number, min: 0, max: 1000000},
    foto: String,
    tags: [String]
});

// definimos el esquema de filtros que vamos a utilizar con nuestra DB
productoSchema.statics.lista = function(filtro, skip, limit, fields, sort) {
    const query = Producto.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;