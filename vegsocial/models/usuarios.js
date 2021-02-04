var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const {send} = require('../mailer/nodemailer')
const Token = require('../models/token')

const saltRounds = 10;

const validateEmail = (email)=>{
  var regEx = /^\w+([\.-]?\w)+@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
  return regEx.test(email)
}

var usuarioSchema = new Schema({
  nombre: String,
  primerApellido: String,
  password:{type: String, required: [true, 'La contraseña es obligatoria']},
  rut: String,
  correo: {type: String, trim: true, required: [true, 'el email es obligatorio'], unique: true, lowercase: true, validate: [validateEmail, 'Ingrese un mail válido, por favor']},
  ubicacion: {
    type: [Number], index: {type: '2dsphere', sparse: true}
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {type: Boolean, default: false}
})

usuarioSchema.methods.validPassword = (password)=>{
  return bcrypt.compareSync(password, this.password);
}

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'})



usuarioSchema.statics.allUsers= (u)=>{
  return this.find({}, u)
}


usuarioSchema.methods.enviar_email_bienvenida = ()=>{
  const token = new Token({_userId: this.discriminator, token: crypto.randomBytest(16).toString('hex')})
  const email_destination = this.email;
  token.save( async(err)=>{
    if(err) {return console.log(err.message)}

    await send(email_destination, token, (err)=>{
      return console.log(err.message)
    })
  })
}

usuarioSchema.statics.add = (usuario, cb)=>{
  this.create(usuario, cb)
}

usuarioSchema.statics.findByCode = (ucode, cb)=>{
  return this.findOne({code: ucode}, cb)
}

usuarioSchema.statics.removeByCode = (ucode, cb)=>{
  return this.deleteOne({code: ucode}, cb)
}

// class Usuario {
//   constructor(id, nombre, primerApellido, rut, correo, ubicacion) {
//     this._id = id;
//     this._nombre = nombre;
//     this._primerApellido = primerApellido;
//     this._rut = rut;
//     this._correo = correo;
//     this._ubicacion = ubicacion;
//   }

//   get id() {
//     return this._id;
//   }

//   get nombre() {
//     return this._nombre;
//   }

//   get primerApellido() {
//     return this._primerApellido;
//   }

//   get rut() {
//     return this._rut;
//   }

//   get correo() {
//     return this._correo;
//   }

//   get ubicacion() {
//     return this._ubicacion;
//   }

//   set nombre(nuevo_nombre) {
//     this._nombre = nuevo_nombre;
//   }
//   set primerApellido(nuevo_apellido) {
//     this._primerApellido = nuevo_apellido;
//   }

//   set correo(correo_nuevo) {
//     this._correo = correo_nuevo;
//   }
//   set ubicacion(nueva_ubicacion) {
//     this._ubicacion = nueva_ubicacion;
//   }

// }

// Usuario.allUsuarios = []



// Usuario.findById = (id)=>{
//     var user = Usuario.allUsuarios.find((u)=> u.id == id)
//     if(user){
//         return user
//     }else{
//         throw new Error('No existe el usuario solicitado')
//     }
// }

// Usuario.DeleteById = (id)=>{
//     for (let i = 0; i < Usuario.allUsuarios.length; i++) {
//         if(Usuario.allUsuarios[i].id == id){
//             Usuario.allUsuarios.splice(i,1);
//             break;
//         }
        
//     }
// }

// var user = new Usuario(1, "Carlos", "Huerta", "17.283.508-2", "huerta.g.carlos@gmail.com", [-33.45694, -70.64827])

// Usuario.add(user);

//module.exports= Usuario;
module.exports = mongoose.model('Usuario', usuarioSchema);