const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuarios')

passport.use(new LocalStrategy((correo, password, done)=>{
    Usuario.findOne({correo: correo}, (err, usuario)=>{
        if(err) return done(err)
        if(usuario == null) return done(null, false, {message: 'Email no encontrado'})
        if(usuario.password != password) return done(null, false, {message: 'Password incorrecto'})
        
        return done(null, usuario);
    })
}))

passport.serializeUser((usuario,cb)=>{
    cb(null, usuario.id)
})

passport.deserializeUser((id,cb)=>{
    Usuario.findById(id, (err, usuario)=>{
        cb(err, usuario)
    })
})

module.exports = passport