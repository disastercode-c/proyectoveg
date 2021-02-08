var mongoose = require('mongoose')
var Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const { send } = require('../mailer/nodemailer')
const Token = require('../models/token')



const validateEmail = (correo)=>{
  const regEx = /^\w+([\.-]?\w)+@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
  return regEx.test(correo)
}

var usuarioSchema = new Schema({
  nombre: String,
  primerApellido: String,
  comuna: {type: String, required: [true, 'Debe ingresar una comuna'], default: 'Santiago'},
  nombreEmprendimiento: String,
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
  verificado: {type: Boolean, default: false}
})

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'})

usuarioSchema.methods.enviar_email = (cb)=>{
  const token = new Token({_userid: this.id, token: crypto.randomBytes(16).toString('hex')})
  let email_destination = this.correo
  let subject = 'Email de bienvenida'
  let text = 'http://localhost:3000/'+ '\/token/confirmation\/' + token.token
  token.save(async(err)=>{
    if(err) {return console.log(err)}
    try{
      await send(email_destination, subject, text)
    }catch(e){
      console.log(e)
    }
  })
}

usuarioSchema.methods.resetPassword = ()=>{
  const token = new Token({_userid: this.id, token:crypto.randomBytes(16).toString('hex')})
  let email_destination = this.email;
  let subject = 'Reset password'
  let text = 'http://localhost:3000/'+ '\/resetpassword\/' + token.token
  token.save( async(err)=>{
    if(err) {return console.log(err)}
    await send(email_destination, subject, text)
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema);