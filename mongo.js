const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {});

// var usuarioSchema = new mongoose.Schema({
//   nombre: String,
//   edad: Number,
// });

// var Usuario = mongoose.model("Usuario", usuarioSchema);

// var unUsuario = new Usuario({ nombre: "Carlos", edad: 30 });
// console.log(unUsuario)