const mensajeModel = require("../models/Mensajes");

//OBTENER MENSAJES
const getMens = async (req, res) => {
  try {
    const data = await mensajeModel.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//OBTENER UN MENSAJE

const getMensaje = async (req, res) => {
  const { id } = req.params;

  try {
    const mensaje = await mensajeModel.findOne({ _id: id });
    res.json(mensaje);
  } catch (error) {
    res.json({
      msg: "Error al obtener mensaje",
    });
  }
};

//INSERTAR UN MENSAJE
const postMens = async (req, res) => {
  const { nombreUsuario, carrera, materia, tipo_aviso, aviso } = req.body;

  const newMensaje = new mensajeModel({
    nombreUsuario,
    carrera,
    materia,
    tipo_aviso,
    aviso,
  });

  const mensaje = await newMensaje.save();

  return res.json({
    message: "Mensaje creado correctamente",
    mensaje,
  });
};

//MODIFICAR UN MENSAJE

const putMens = async (req, res) => {
  const { id } = req.params;
  const { nombreUsuario, carrera, materia, tipo_aviso, aviso } = req.body;
  const actualizar = {};

  if (nombreUsuario) {
    actualizar.nombreUsuario = nombreUsuario;
  }

  if (carrera) {
    actualizar.carrera = carrera;
  }

  if (materia) {
    actualizar.materia = materia;
  }

  if (tipo_aviso) {
    actualizar.tipo_aviso = tipo_aviso;
  }
  if (aviso) {
    actualizar.aviso = aviso;
  }

  if (
    actualizar.nombreUsuario ||
    actualizar.carrera ||
    actualizar.materia ||
    actualizar.tipo_aviso ||
    actualizar.aviso
  ) {
    try {
      const aviso = await mensajeModel.findByIdAndUpdate(id, actualizar, {
        new: true,
      });
      return res.json({ msg: "Avisos actualizados" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar el aviso" });
    }
  } else {
    res.status(401).json({
      msg: "No se enviaron datos",
    });
  }
};

//ELIMINAR UN MENSAJE
const deleteMens = async (req, res) => {
  const { id } = req.params;

  try {
    await mensajeModel.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "El mensaje se ha eliminado",
    });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar el mensaje" });
  }
};

module.exports = { getMensaje, getMens, postMens, putMens, deleteMens };
