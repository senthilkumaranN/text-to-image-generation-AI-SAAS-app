const mongoose = require('mongoose');

const Database = async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Database connected successfully")
    })
     await mongoose.connect(`${process.env.MONGODB_URL}`)
}

module.exports = Database