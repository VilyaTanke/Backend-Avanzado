var express = require('express');
var router = express.Router();
const {query, validationResult } = require('express-validator');
const Producto = require('../models/Producto');

/* GET home page. */


router.get('/', async (req, res, next) => {

  try {
      res.locals.bienvenido = res.__('Bienvenido a Nodepop');
      const ahora = new Date();
      res.render('index', { 
        title: 'Nodepop',
        fechaActual: ahora.toLocaleDateString()
      })

  } catch (err) {
      next(err);
  }

});

 
module.exports = router;
