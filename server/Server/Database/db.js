const mongoose = require('mongoose');

const db = {};
db.connect = async () => {
    try {
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log('hubo un error')
        console.log(error);
        process.exit(1); // stop app
    }
}

module.exports = db;