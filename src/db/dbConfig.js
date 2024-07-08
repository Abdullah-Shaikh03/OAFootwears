const mongoose = require('mongoose');

const dbConfig = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('Database connected successfully')
        })
        connection.on('error', () => {
            console.log('Error in connecting to database' + error)
            process.exit(1)
        })
    }
    catch (error) {
        console.log(error)
    }
}


export default dbConfig;