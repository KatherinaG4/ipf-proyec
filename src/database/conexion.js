const mongoose = require('mongoose');


const conectarDB = async () => {
    // try {
    //     connect(process.env.URI_MONGODB);
    //     console.log('Base de datos conectada');
    // } catch (err) {
    //     console.log(err);
    // }
    const URI_MONGODB= process.env.URI_MONGODB;
    mongoose.connect(
        URI_MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        },
        (err, res) =>{
            if(!err){
                console.log('*** CONEXION CORRECTA ***')

            }else{
                console.log('*** CONEXION INCORRECTA ***')
            }
        }
    )
}


module.exports = conectarDB;