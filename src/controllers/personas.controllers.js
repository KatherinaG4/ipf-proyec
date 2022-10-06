const personasModel = require("../models/Personas");

//OBTENER TODAS LAS PERSONAS


const getPersonas = async (req, res) => {
try {
    const data = await personasModel.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

//OBTENER UNA PERSONA

const getPersona = async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await personasModel.findOne({ _id: id });
    res.json(persona);
  } catch (error) {
    res.json({
      msg: "Error al obtener persona",
    });
  }
};

const postPersonas = async (req, res) => {
  const {
    nombreApellido,
    dni,
    email,
    fecha_nacimiento,
    direccion,
    telefono,
    rol = ["common_user"],
  } = req.body;

  const newPersona = new personasModel({
    nombreApellido,
    dni,
    email,
    fecha_nacimiento,
    direccion,
    telefono,
    rol
  });

  const persona = await newPersona.save();

  return res.json({
    message: "Persona creada correctamente",
    persona,
  });
};


//MODIFICAR UNA PERSONA

const putPersonas = async (req, res) => {
  const { id } = req.params;
  const {
    nombreApellido,
    dni,
    email,
    fecha_nacimiento,
    direccion,
    telefono,
    rol,
  } = req.body;
  const actualizar = {};

  if (nombreApellido) {
    actualizar.nombreApellido = nombreApellido;
  }

  if (dni) {
    actualizar.dni = dni;
  }

  if (email) {
    actualizar.email = email;
  }

  if (fecha_nacimiento) {
    actualizar.fecha_nacimiento = fecha_nacimiento;
  }
  if (direccion) {
    actualizar.direccion = direccion;
  }
  if (telefono) {
    actualizar.telefono = telefono;
  }
  if (rol) {
    actualizar.rol = rol;
  }

  if (
    actualizar.nombreApellido ||
    actualizar.dni ||
    actualizar.email ||
    actualizar.fecha_nacimiento ||
    actualizar.direccion ||
    actualizar.telefono ||
    actualizar.rol
  ) {
    try {
      const persona = await personasModel.findByIdAndUpdate(id, actualizar, {
        new: true,
      });
      return res.json({ msg: "Datos de la persona actualizado" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar los datos de la persona" });
    }
  } else {
    res.status(401).json({
      msg: "No se enviaron datos",
    });
  }
};

//ELIMINAR UNA PERSONA
const deletePersonas = async () => {
  const { id } = req.params;

  try {
    await personasModel.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "La persona ha sido eliminado",
    });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar la persona" });
  }
};

module.exports = {
  getPersonas,
  postPersonas,
  putPersonas,
  deletePersonas,
  getPersona
};
