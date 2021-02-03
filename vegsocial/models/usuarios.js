var mongoose = require('mongoose')
var Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const {send} = require('../public/javascripts/mailer/nodemailer')

const saltRounds = 10;

const validateEmail = (email)=>{
  var regEx = /^\w+([\.-]?\w)+@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
  return regEx.test(email)
}

var usuarioSchema = new Schema({
  code: Number,
  nombre: String,
  primerApellido: String,
  password:{type: String, required: [true, 'La contraseña es obligatoria']},
  rut: String,
  correo: {type: String, trim: true, required: [true, 'el email es obligatorio'], unique: true, lowercase: true, validate: [validateEmail, 'Ingrese un mail válido, por favor']},
  match: /^\w+([\.-]?\w)+@\w+([.\-]?\w+)*(\.\w{2,3})+$/,
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

usuarioSchema.pre('save', (next)=>{
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
  next();
})


usuarioSchema.method.toString= ()=>{
  return 'code: ' + this.code + 'nombre: ' + this.nombre
}

usuarioSchema.statics.allUsers= (u)=>{
  return this.find({}, u)
}

usuarioSchema.statics.createInstance = (code, nombre, primerApellido, rut, correo, ubicacion)=>{
  return new this({
    code: code,
    nombre: nombre,
    primerApellido: primerApellido,
    rut: rut,
    correo: correo,
    ubicacion: ubicacion
  })
}

usuarioSchema.methods.enviar_email_bienvenida = (cb)=>{
  const token = new token({_userId: this.discriminator, token:crypto.randomBytest(16).toString('hex')})
  const email_destination = this.email;
  token.save( async(err)=>{
    if(err) {return console.log(err.message)}

    await send(email_destination, (err)=>{
      return console.log(err.message)
    })
  })
}

// usuarioSchema.statics.add = (usuario, cb)=>{
//   this.create(usuario, cb)
// }

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