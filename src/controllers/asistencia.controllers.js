const AsistenciaModel = require("../models/Asistencia");
const User = require("../models/User")


//OBTENER TODAS LAS ASISTENCIA

const getAsist = async (req, res) => {
  try {
    const data = await AsistenciaModel.find({});
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//OBTENER UNA ASISTENCIA
const getAsistencia = async (req, res) =>{
  
  const {id}= req.params;
  
  try {
    const asistencia = AsistenciaModel.findOne({_id:id})
    res.json(asistencia)
  } catch (error) {
    res.json({
      msg: "Error al obtener asistencia", 
    });
  }

}



//INSERTAR UNA ASISTENCIA

const postAsist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newAsist = {
      carrera: req.body.carrera,
      materia: req.body.materia,
      fecha: req.body.fecha,
      nombreAlumno: req.user.id,
    };
    const asist = new AsistenciaModel(newAsist);

    await asist.save();

    res.json(asist);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//MODIFICAR UNA ASISTENCIA

const putAsist = async (req, res) => {
  const { id } = req.params;
  const {nombreAlumno, carrera, materia, fecha } = req.body;
  const actualizar = {};


  if (nombreAlumno) {
    actualizar.nombreAlumno = nombreAlumno;
  }
  if (carrera) {
    actualizar.carrera = carrera;
  }

  if (materia) {
    actualizar.materia = materia;
  }

  if (fecha) {
    actualizar.fecha = fecha;
  }

  if (
    actualizar.nombreAlumno ||
    actualizar.carrera ||
    actualizar.materia ||
    actualizar.fecha
  ) {
    try {
      const asistencia = await AsistenciaModel.findByIdAndUpdate(
        id,
        actualizar,
        {
          new: true,
        }
      );
      return res.json({ msg: "La asistencia ha sido actualizado" });
    } catch (error) {
      return res.status(401).json({ msg: "Error al actualizar la asistencia" });
    }
  } else {
    res.status(401).json({
      msg: "No se enviaron datos",
    });
  }
};


//ELIMINAR UNA ASISTENCIA
const deleteAsist = async (req, res) => {
  const { id } = req.params;

  try {
    await AsistenciaModel.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "La asistencia ha sido eliminada",
    });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar la asistencia" });
  }
};

module.exports = { getAsist, postAsist, putAsist, deleteAsist, getAsistencia };
