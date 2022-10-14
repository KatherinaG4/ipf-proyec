const { model, Schema } = require("mongoose");

const PersonasSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
  rol: [{ type: String, required: true }],

  dataAlumno: [
    {
      nombre_apellido: {
        type: String,
        required: true,
      },
      dni: {
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
      email: {
        type: String,
        required: true,
      },
      nro_telefono: {
        type: Number,
        required: true,
      },
    },
  ],
  dataAdmin: [
    {
      nombre_apellido: {
        type: String,
        required: true,
      },
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
  ],
  dataProfe: [
    {
      nombre_apellido: {
        type: String,
        required: true,
      },
      dni: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      nro_telefono: {
        type: Number,
        required: true,
      },
      nombremateria: {
        type: Schema.Types.ObjectId,
        ref: "materias",
      },
    },
  ],
});

module.exports = model("personas", PersonasSchema);
