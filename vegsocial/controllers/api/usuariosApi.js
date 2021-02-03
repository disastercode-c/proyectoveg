const Usuario = require("../../models/usuarios");

exports.usuarios_list = (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    res.status(200).json({ usuarios: usuarios });
  });
};

exports.create_usuario = (req, res) => {
  let ubicacion = [req.body.lat, req.body.lng];
  var user = Usuario.createInstance(
    req.body.id,
    req.body.nombre,
    req.body.primerApellido,
    req.body.rut,
    req.body.correo,
    ubicacion
  );

  res.status(201).json({
    usuario: user,
  });
};

exports.delete_usuario = (req, res) => {
  Usuario.removeByCode(req.body.id);
  res.status(204).send();
};
