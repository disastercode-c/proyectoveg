var jwt = require("jsonwebtoken");
const SECRET_KEY = "llavesecreta";
var Usuario = require("../models/usuarios");

module.exports = {
  loginView: (req, res, next) => {
    res.render("session/login");
  },

  loginPost: (req, res, next) => {
    const { correo, password } = req.body;
    Usuario.findOne( {correo: correo} , (err, usuario) => {
      let token = usuario
        ? jwt.sign({ id: usuario._id, nombre: usuario.nombre }, SECRET_KEY)
        : false;

      //res.status(200).json({message: 'usuario encontrado', data:{usuario: usuario, token: token}})
      usuario && usuario.password == password ? res.redirect(`/admin?token=${token}`) : res.redirect('/login')
    });
  },

  forgotPasswordGet: (req, res, next) => {
    res.render("session/forgotPasword");
  },

  forgotPasswordPost: (req, res, next) => {
    Usuario.findOne({ correo: req.body.correo }, (err, usuario) => {
      if (!usuario)
        return res.render("session/forgotPassword", {
          info: { message: "No existe el email para un usuario existente" },
        });

      usuario.resetPassword((err) => {
        if (err) return next(err);
      });

      res.render("session/forgotPasswordMessage");
    });
  },

  resetPasswordGet: (req, res, next) => {
    Token.findOne({ token: req.params.token }, (err, token) => {
      if (!token)
        return res
          .status(400)
          .send({
            type: "not-verified",
            msg:
              "No existe un usuario asociado al token. Verifique si su token expiró",
          });
      Usuario.findById(token._userId, (err, usuario) => {
        if (!usuario)
          return res
            .status(400)
            .send({ msg: "No existe un usuario asociado al token" });
        res.render("session/resetPassword", { errors: {}, usuario: usuario });
      });
    });
  },
  resetPasswordPost: (req, res, next) => {
    if (req.body.password != req.body.confirm_password) {
      res.render("session/resetPassword", {
        errors: {
          confirm_password: {
            message: "No coincide con el password ingresado",
          },
        },
      });
      return;
    }
    Usuario.findOne({ correo: req.body.correo }, (err, usuario) => {
      usuario.password = req.body.password;
      usuario.save((err) => {
        if (err) {
          res.render("session/resetPassword", { errors: err.errors });
        } else {
          res.redirect("/login");
        }
      });
    });
  },
};
