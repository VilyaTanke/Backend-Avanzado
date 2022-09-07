var express = require('express');
var router = express.Router();
const {query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  const ahora = new Date();

  res.locals.bienvenido = 'Bienvenido a Nodepop';

  res.render('index', { 
    title: 'Nodepop',
    diaActual: ahora.getDate(),
    mesActual: ahora.getMonth(),
    annoActual: ahora.getFullYear()
  });
});

router.post('/en_el_body', (req, res, next) => {
  console.log(req.body);
  res.send('ok');
});

module.exports = router;
