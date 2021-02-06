var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')
const {send} = require('../mailer/nodemailer')
const Token = require('../models/token')


const validateEmail = (correo)=>{
  const regEx = /^\w+([\.-]?\w)+@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
  return regEx.test(correo)
}

var usuarioSchema = new Schema({
  nombre: String,
  primerApellido: String,
  comuna: {type: String, required: [true, 'Debe ingresar una comuna']},
  password:{type: String, required: [true, 'La contraseña es obligatoria']},
  rut: String,
  correo: {type: String, 
    trim: true, required: [true, 'el email es obligatorio'], 
    unique: true, 
    lowercase: true, 
    validate: [validateEmail, 'Ingrese un mail válido, por favor']},
  ubicacion: {
    type: [Number], index: {type: '2dsphere', sparse: true}
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {type: Boolean, default: false}
})

usuarioSchema.pre('save', ()=>{
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, 10)
  }
})


usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'})

usuarioSchema.methods.enviar_email_bienvenida = async()=>{
  const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')})
  const email_destination = this.correo;
  token.save( async(err)=>{
    if(err) {return console.log(err.message)}

    let subject = 'Verificacion de cuenta'
    let to= email_destination
    let text = 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click en este enlace: \n' + 'http://localhost:3000/' + 'confirmation/' + token.token + '.\n'
    const result = await send(to, subject, text)

    if(result){
      console.log('email enviado satisfactoriamente')
    }
  })
}

usuarioSchema.statics.findByCode = (ucode, cb)=>{
  return this.findOne({code: ucode}, cb)
}

usuarioSchema.statics.removeByCode = (ucode, cb)=>{
  return this.deleteOne({code: ucode}, cb)
}


usuarioSchema.methods.validPassword = (password)=>{
  return bcrypt.compareSync(password, this.password);
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