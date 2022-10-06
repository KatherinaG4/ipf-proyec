const MateriasModel = require("../models/Materias");

//OBTENER TODAS LAS MATERIA

const getMaterias = async (req, res) => {
 try {
   const data = await MateriasModel.find({});
   res.json(data);
 } catch (error) {
   res.status(404).json({ message: error.message });
 }

};

//OBTENEMOS UNA MATERIA

const getMateria = async (req, res) =>{
  const {id} = req.params;
  
  try {
    const materia = MateriasModel.findOne({_id:id})
    res.json(materia)
    
  } catch (error) {
    res.json({
      msg: "Error al obtener la materia",
    });
    
  }


}



//INSERTAMOS UNA MATERIA

const postMateria = async (req, res) => {
  const { profeTitular, nombreMateria, horarioDesde, horarioHasta, nota } =
    req.body;

  const newMateria = new MateriasModel({
    profeTitular,
    nombreMateria,
    horarioDesde,
    horarioHasta,
    nota,
  });

  const materia = await newMateria.save();

  return res.json({
    message: "Materia creada correctamente",
    materia,
  });
};


//MODIFICAMOS UNA MATERIA

const putMateria = async (req,res) => {
   const { id } = req.params;
   const {profeTitular, nombreMateria, horarioDesde, horarioHasta, nota } = req.body;
   const actualizar = {};

   if (profeTitular) {
     actualizar.profeTitular = profeTitular;
   }

   if (nombreMateria) {
     actualizar.nombreMateria = nombreMateria;
   }

   if (horarioDesde) {
     actualizar.horarioDesde = horarioDesde;
   }

   if (horarioHasta) {
     actualizar.horarioHasta = horarioHasta;
   }

   if (nota) {
     actualizar.nota = nota;
   }

   if (
     actualizar.profeTitular ||
     actualizar.nombreMateria ||
     actualizar.horarioDesde ||
     actualizar.horarioHasta ||
     actualizar.nota
   ) {
     try {
       const materia = await MateriasModel.findByIdAndUpdate(id, actualizar, {
         new: true,
       });
       return res.json({ msg: "La materia ha sido actualizado" });
     } catch (error) {
       return res.status(401).json({ msg: "Error al actualizar la materia" });
     }
   } else {
     res.status(401).json({
       msg: "No se enviaron datos",
     });
   }
};


//ELIMINAMOS UNA MATERIA
const deleteMateria = async (req,res) => {
  const { id } = req.params;

  try {
    await MateriasModel.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "La materia ha sido eliminada",
    });
  } catch (error) {
    res.status(404).json({ msg: "Error al eliminar la materia" });
  }
};

module.exports = { getMaterias, postMateria, putMateria, deleteMateria, getMateria };
