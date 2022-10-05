const usuariosModel = require("../models/Usuarios");

//TODOS LOS USUARIOS
const getUsuarios = async (req, res) => {
  try {
    const data = await usuariosModel.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UN USUARIO
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

//INSERTAR USUARIOS

const postUsuarios = async (req, res) => {
  const {
    name, dni, email, pass, rol
  } = req.body;

  const newUsuario = new usuariosModel({
    name,
    dni,
    email,
    pass,
    rol,
  });

  const usuario = await newUsuario.save();

  return res.json({
    message: "Usuario creado correctamente",
    usuario,
  });
};

//MODIFICAR USUARIO

const putUsuarios = async (req,res) => {
  const { id } = req.params;
const {name, dni, email, pass, rol } = req.body;
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
if (rol) {
  actualizar.rol = rol;
}

if (
  actualizar.name ||
  actualizar.dni ||
  actualizar.email ||
  actualizar.pass ||
  actualizar.rol
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
