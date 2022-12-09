const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
    const locale = req.params.locale;
    // res.send('me piden cambiar a ' + locale);

    // poner una cookie en la respuesta que indique el nuevo locale
    res.cookie('nodeapp-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 // un mes
    })

    // hacer redirección a la misma pagina de donde venía la patición
    res.redirect(req.get('Referer'));
});

module.exports = router;