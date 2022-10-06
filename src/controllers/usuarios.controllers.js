const usuariosModel = require("../models/Usuarios");
const bcrypt = require("bcrypt");

//POST LOGIN DE USUARIO


//OBTENER TODOS LOS USUARIOS
const getUsuarios = async (req, res) => {
  try {
    const data = await usuariosModel.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//OBTENER UN USUARIO
const getUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await usuariosModel.findOne({ _id: id });
    res.json(usuario);
  } catch (error) {
    res.json({
      msg: "Error al obtener usuario",
    });
  }
};

//INSERTAR UN USUARIO

const postUsuarios = async (req, res) => {
  const {
    name,
    dni,
    email,
    pass,
    confirmPassword,
    rol = ["common_user"],
  } = req.body;

  if (pass !== confirmPassword) {
    return res.status(400).json({
      msg: "Verifique los campos y vuelva a intentarlo",
    });
  }

  const passwordHashed = bcrypt.hashSync(pass, 10);

  const newUsuario = new usuariosModel({
    name,
    dni,
    pass: passwordHashed,
    email,
    rol,
  });

  try {
    const usuario = await newUsuario.save();

    return res.json({
      usuario,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      msg: "Error al crear el usuario",
    });
  }
};;

//MODIFICAR USUARIO

const putUsuarios = async (req,res) => {
  const { id } = req.params;
const {name, dni, email, pass } = req.body;
const actualizar = {};

if (name) {
  actualizar.name = name;
}

if (dni) {
  actualizar.dni = dni;
}

if (email) {
  actualizar.email = email;
}

if (pass) {
  actualizar.pass = pass;
}

if (
  actualizar.name ||
  actualizar.dni ||
  actualizar.email ||
  actualizar.pass
) {
  try {
    const usuario = await usuariosModel.findByIdAndUpdate(id, actualizar, {
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

const deleteUsuarios = async (req,res) => {
  const { id } = req.params;

  try {
    await usuariosModel.findByIdAndDelete(id, { new: true });

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
  getUsuario,

};
