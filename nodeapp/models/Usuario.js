'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Requester } = require('cote');

const requester = new Requester({ name: 'nodeapp' });

// crear el esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

// método estáico
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
}

// método de instancia
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

usuarioSchema.methods.enviarEmail = async function(asunto, cuerpo) {

  const evento = {
    type: 'enviar-email',

    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo
  }

  return new Promise(resolve => requester.send(evento, resolve));

}

// crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exporto el modelo
module.exports = Usuario;