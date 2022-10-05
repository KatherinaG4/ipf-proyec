const { model, Schema, mongoose } = require('mongoose');


const AsistenciaSchema = new Schema({
    nombreAlumno: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "personas"
    },
    carrera: {
        type: String,
        required: true,
    },

    materia: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    asistio: {
        type: Boolean,
        default: true,
    }

});


module.exports = model('asistencia', AsistenciaSchema);