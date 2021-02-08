var Usuario = require("../models/usuarios")

module.exports = {
    list: (req, res, next)=>{
        Usuario.find({}, (err, usuarios)=>{
            res.render('usuarios/index', {usuarios: usuarios})
        })
    },

    update_get: (req,res,next)=>{
        Usuario.findById(req.params.id, (err, usuario)=>{
            console.log(usuario)
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
            res.render('usuarios/create', {errors: {confirm_password:{message: 'No coinciden los passwords'}}})
            return
        }
            Usuario.create({nombre:req.body.nombre, primerApellido: req.body.primerApellido, rut: req.body.rut, password: req.body.password, correo: req.body.correo, ubicacion: [req.body.lat, req.body.lng]}, (err, nuevoUsuario)=>{
                if(err){
                    console.log(err.message)
                    res.render('usuarios/create', {errors: err.message})
                }else{
                    nuevoUsuario.enviar_email();
                    res.redirect('/usuarios')
                }
            })
    },

    delete: (req,res,next)=>{
        Usuario.findByIdAndDelete(req.body.id, (err)=>{
            if(err){
                next(err)
            }else{
                res.redirect('/usuarios')
            }
        })
    },

}