const mongoose = require('mongoose')
var Schema = mongoose.Schema

var productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: String,
    foto: {}
})



module.exports = mongoose.model('Producto', productoSchema)