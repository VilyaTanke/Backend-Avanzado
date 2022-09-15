const auth = require ('Basic-auth');


// modulo Basic-Auth para proteger la base de datos de nuestra api

module.exports = (req, res, next) => {

    console.log('req');
    const user = auth(req);

    // buscar el usuario predefinido en base de datos
    if (!user || user.name !== 'admin' || user.pass !== '1234') {
        res.set('WWW-Authenticate', 'Basic realm=Authorization require');
        res.sendStatus(401);
        return;
    };

    next();
}