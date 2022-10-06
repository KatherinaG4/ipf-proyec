require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const conectarDB = require('./database/conexion');

// Initialiaciones
conectarDB();
const app = express()

// Configs
const { port } = require('./config/variables');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api/asistencia",require("./routes/asistencia.routes"))
app.use("/api/mensajes",require("./routes/mensajes.routes"))
app.use("/api/personas", require("./routes/personas.routes"))
app.use("/api/materias", require("./routes/materias.routes"));
app.use("/api/usuarios", require("./routes/usuario.routes"));


// Archivos estáticos
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));