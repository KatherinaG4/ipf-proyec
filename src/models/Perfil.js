const { model, Schema } = require("mongoose");

const PerfilSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rol: { type: String, required: true },

  dataAlumno: {
    instituto_precedente: {
      type: String,
      required: true,
    },
    titulo_secundario: {
      type: String,
      required: true,
    },
    fecha_nacimiento: {
      type: Date,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    nro_telefono: {
      type: Number,
      required: true,
    },
  },
  dataAdmin: {
    dni: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    nro_telefono: {
      type: Number,
      required: true,
    },
  },
  dataProfe: {
    dni: {
      type: String,
      required: true,
    },
    nro_telefono: {
      type: Number,
      required: true,
    },
    nombre_materia: {
      type: Schema.Types.ObjectId,
      ref: "materias",
    },
  },
});

module.exports = model("perfil", PerfilSchema);
