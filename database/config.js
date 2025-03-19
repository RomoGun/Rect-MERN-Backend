const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        mongoose.connect(process.env.DB_CNN, 
        // {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // // useCreateIndex: true,
        // }
    );
    console.log('DB_ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    dbConection,
}