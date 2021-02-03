var Usuario = require("../models/usuarios")


// exports.usuarioslist = (req,res)=>{
//     res.render("usuarios/index", {usuarios: Usuario.allUsuarios})
// }

// exports.createUsuarioGet = (req,res)=>{
//     res.render("usuarios/create")
// }

// exports.createUsuarioPost = (req,res)=>{
//     var user = new Usuario(req.body.id, req.body.nombre, req.body.primerApellido, req.body.rut, req.body.correo)
//     user.ubicacion = [req.body.lat, req.body.lng];
//     Usuario.add(user);

//     res.redirect("/usuarios")
// }
// exports.usuariosUpdateGet = (req,res)=>{
//     var user = Usuario.findById(req.params.id)
//     res.render("usuarios/update", {user})
// }

// exports.usuariosUpdatePost = (req,res)=>{
//     var user = Usuario.findById(req.params.id)

//     user.nombre = req.body.nombre
//     user.primerApellido = req.body.primerApellido
//     user.correo = req.body.correo
//     user.ubicacion = [req.body.lat, req.body.lng]

//     res.redirect("/usuarios")
// }

// exports.removeUserById = (req, res)=>{
//     Usuario.DeleteById(req.params.id);
    
//     res.redirect("/usuarios")
// }

module.exports = {
    list: (req, res, next)=>{
        Usuario.find({}, (err, usuarios)=>{
            res.render('usuarios/index', {usuarios: usuarios})
        })
    },

    update_get: (req,res,next)=>{
        Usuario.findById(req.params.id, (err, usuario)=>{
            res.render('usuarios/update', {errors:{}, usuario: usuario})
        })
    },

    update: (req,res,next)=>{
        let update_values = {nombre: req.body.nombre};
        Usuario.findByIdAndUpdate(req.params.id, update_values, (err, usuario)=>{
            if(err){
                res.render('usuarios/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre})})
            }else{
                res.redirect('/usuarios')
                return
            }
        })
        res.render('usuarios/update')
    },

    create_get: (req,res,next)=>{
        res.render('usuarios/create', {errors:{}, usuario: new Usuario()})
    },

    create: (req,res,next)=>{
        if(req.body.password != req.body.confirm_password){
            res.render('usuarios/create', {errors: {confirm_password:{message: 'No coinciden los passwords'}}, usuario: new Usuario({nombre: req.body.nombre})})
            return
        }else{
            nuevoUsuario.enviar_email_bienvenida();
            res.redirect('/usuarios')
        }
    },

    delete: (req,res,next)=>{
        Usuario.findByIdAndDelete(req.body.id, (err)=>{
            if(err){
                next(err)
            }else{
                res.redirect('/usuarios')
            }
        })
    }
}