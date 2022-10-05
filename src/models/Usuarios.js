const { model, Schema } = require('mongoose');


const UsuarioSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    dni: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique:true,
    },
    pass: {
        type: String,
        required: true,
    },
    rol:{
        type: ["docente","alumno","administ"],
        default:"alumno"
    },
    isActive:{
        type: Boolean,
        default:true
    }

},{
    timestamps: true,
    versionKey: false
});


module.exports = model('usuario', UsuarioSchema);