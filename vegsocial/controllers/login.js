var jwt = require('jsonwebtoken')
const SECRET_KEY = 'llavesecreta'
var Usuario = require('../models/usuarios')


module.exports = {
  loginView: (req, res, next) => {
    res.render("session/login");
  },
 
  loginPost: (req,res,next)=>{
    const {correo, password} = req.body
    Usuario.findOne({correo: correo}, (err, usuario)=>{
      let token = usuario ? jwt.sign(JSON.stringify(usuario), SECRET_KEY):false
      usuario && usuario.password == password ? res.redirect(`/admin?token=${token}`) : res.redirect('/login')
    })
  }
};
