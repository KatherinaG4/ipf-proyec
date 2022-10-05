const { model, Schema } = require('mongoose');


const PersonasSchema = new Schema({
    nombreApellido: {
        type: String, 
        required: true
    },
    dni: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique:true,
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
    },
    direccion: {
        type: Boolean,
        required: true,
    },
    telefono:{
    type: String,
    unique:true
    },
    rol:[{
        type:String
    }]

});


module.exports = model('personas', PersonasSchema);