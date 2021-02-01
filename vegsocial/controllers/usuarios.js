var Usuario = require("../models/usuarios")


exports.usuarioslist = (req,res)=>{
    res.render("usuarios/index", {usuarios: Usuario.allUsuarios})
}

exports.createUsuarioGet = (req,res)=>{
    res.render("usuarios/create")
}

exports.createUsuarioPost = (req,res)=>{
    var user = new Usuario(req.body.id, req.body.nombre, req.body.primerApellido, req.body.rut, req.body.correo)
    user.ubicacion = [req.body.lat, req.body.lng];
    Usuario.add(user);

    res.redirect("/usuarios")
}
exports.usuariosUpdateGet = (req,res)=>{
    var user = Usuario.findById(req.params.id)
    res.render("usuarios/update", {user})
}

exports.usuariosUpdatePost = (req,res)=>{
    var user = Usuario.findById(req.params.id)

    user.nombre = req.body.nombre
    user.primerApellido = req.body.primerApellido
    user.correo = req.body.correo
    user.ubicacion = [req.body.lat, req.body.lng]

    res.redirect("/usuarios")
}

exports.removeUserById = (req, res)=>{
    Usuario.DeleteById(req.params.id);
    
    res.redirect("/usuarios")
}