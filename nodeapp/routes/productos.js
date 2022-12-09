var express = require('express');
var router = express.Router();
const Producto = require('../models/Producto');

/* GET ./productos */


router.get('/', async (req, res, next) => {

  try {


      // filtros
      const name = req.query.name;
      const tags = req.query.tags;
      const venta = req.query.venta;
      const _id = req.query._id;


      // paginación
      const skip = req.query.skip;
      const limit = req.query.limit;

      // selección de campos
      const fields = req.query.fields;
      const sort = req.query.sort;


      // creamos el filtro vacio
      const filtro = {}

      if (name) {
        filtro.name = name;
      }

      if (tags) {
        filtro.tags = tags;
      }

      if (venta) {
        filtro.venta = venta;
      }

      if (_id) {
        filtro._id = _id;
      }


      const productos = await Producto.lista(filtro, skip, limit, fields, sort);

      res.locals.bienvenido = 'Bienvenido a Nodepop';
      const ahora = new Date();
      res.render('productos', { 
        title: 'Nodepop',
        fechaActual: ahora.toLocaleDateString(),
        productos: productos
      })

  } catch (err) {
      next(err);
  }

});


module.exports = router;
