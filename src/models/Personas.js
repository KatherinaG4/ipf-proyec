const { model, Schema } = require("mongoose");


const PersonasSchema = new Schema({
  nombreApellido: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
      type: String,
      required: true
  },

  rol: [
    {
      type: String, 
      required:true
    },
  ],
});


module.exports = model('personas', PersonasSchema);