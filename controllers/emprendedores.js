var Usuario = require('../models/usuarios')

module.exports={
    emprendedoresList: (req,res,next)=>{
        Usuario.find({},(err,usuarios)=>{
            if(err) res.render('emprendedores/emprendedores', {errors:{msg: 'Error al buscar listado de emprendedores'}})
            res.render('emprendedores/emprendedores', {usuarios: usuarios})
        })
    },
    emprendedorView: (req,res,next)=>{
        const {nombre} = req.params
        Usuario.findOne({nombre: nombre}, (err, usuario)=>{
            console.log(usuario)
            res.render('emprendedores/details', {usuario:usuario})
        })
    }
}