const { model, Schema, mongoose } = require('mongoose');


const MateriasSchema = new Schema({
  profeTitular: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "personas",
  },
  nombreMateria: {
    type: String,
    required: true,
  },

  horarioDesde: {
    type: Date,
    required: true,
  },
  horarioHasta: {
    type: Date,
    required: true,
  },
  nota: {
    alumno_refId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personas",
    },

    tipo_examen: {
      type: String,
      required: true,
    },

    primer_parcial: {
      type: String,
      required: true,
    },
    segundo_parcial: {
      type: String,
      required: true,
    },
    recuperatorio: {
      type: String,
      required: true,
    },
    promedio_final: {
      type: String,
      required: true,
    },
  },
});


module.exports = model('materias', MateriasSchema);