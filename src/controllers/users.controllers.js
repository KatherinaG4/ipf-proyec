const User = require("../models/User");
const bcrypt = require("bcrypt");
const generarJWT = require("../helpers/generarJwt");



//LOGIN DE USUARIO

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Error de autenticación",
    });
  }

  // Busqueda del usuario segun las credenciales recibidas
  const user = await User.findOne({ email, password });

  if (!user.isActive) {
    return res.status(400).json({
      msg: "Error al autenticarse, verifique las credenciales",
    });
  }

  // Generación del token de autenticación
  const token = await generarJWT({ uid: user._id });

  return res.json({
    user,
    token,
  });

};

//OBTENER TODOS LOS USUARIOS
const getUsuarios = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//OBTENER UN USUARIO
// const getUsuario = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const usuario = await usuariosModel.findOne({ _id: id });
//     res.json(usuario);
//   } catch (error) {
//     res.json({
//       msg: "Error al obtener usuario",
//     });
//   }
// };

//INSERTAR UN USUARIO

const postUsuarios = async (req, res) => {
   const {
     username,
     password,
     confirmPassword,
     email,
     roles = ["common_user"],
   } = req.body;

   if (password !== confirmPassword) {
     return res.status(400).json({
       msg: "Verifique los campos y vuelva a intentarlo",
     });
   }

   const passwordHashed = bcrypt.hashSync(password, 10);

   const nuevoUsuario = new User({
     username,
     password: passwordHashed,
     email,
     roles,
   });

   try {
     const usuarioCreado = await nuevoUsuario.save();

     return res.json({
       usuarioCreado,
     });
   } catch (error) {
     console.log(error.message);
     return res.status(400).json({
       msg: "Error al crear el usuario",
     });
   }
};

//MODIFICAR USUARIO

const putUsuarios = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, roles } = req.body;
  const actualizar = {};

  if (username) {
    actualizar.username = username;
  }

  if (password) {
    actualizar.password = password;
  }

  if (email) {
    actualizar.email = email;
  }

  if (roles) {
    actualizar.roles = roles;
  }

  if (
    actualizar.username ||
    actualizar.dni ||
    actualizar.email ||
    actualizar.roles
  ) {
    try {
      const usuario = await User.findByIdAndUpdate(id, actualizar, {
        new: true,
      });
      return res.json({ msg: "Usuario actualizado" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar el usuario" });
    }
  } else {
    res.status(401).json({
      msg: "No se enviaron datos",
    });
  }
};

//ELIMINAR USUARIOS

const deleteUsuarios = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "El usuario se ha eliminado",
    });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar el usuario" });
  }
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  login
};
