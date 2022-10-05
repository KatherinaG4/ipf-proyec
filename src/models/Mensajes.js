const { model, Schema } = require('mongoose');


const MensajeSchema = new Schema({
    nombreUsuario: {
        type: String
    },
    carrera: {
        type: String,
        required: true,
    },

    materia: {
        type: String,
        required: true,
    },
    tipo_aviso:{
        type: String,
        required: true,
    },
    aviso:{
        type: String,
        required: true,
    }
});


module.exports = model('mensaje', MensajeSchema);