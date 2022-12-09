const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('errore de conexión', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONNETION_STRING);

module.exports = mongoose.connection;
