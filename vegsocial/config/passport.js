const passport = require('passport');
const LocalStrategy = require('passport-local');
const Usuario = require('../models/usuarios')

passport.use(new LocalStrategy((correo, password, done)=>{
    Usuario.findOne({correo:correo}, (err, usuario)=>{
        if(err) return done(err)
        if(!usuario) return done(null, false, {message: 'Email no encontrado'})
        if(!usuario.validPassword(password)) return done(null, false, {message: 'Password incorrecto'})
        
        return done(null, usuario);
    })
}))

passport.serializeUser((user,cb)=>{
    cb(null, user.id)
})

passport.deserializeUser((id,cb)=>{
    Usuario.findById(id, (err, usuario)=>{
        cb(err, usuario)
    })
})

module.exports = passport