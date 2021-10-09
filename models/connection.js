//////////////////////////
//Import dependencies
///////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")

///////////////
// Database Connection
///////////////

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Establish connection
mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
.on("open", ()=> console.log("Connected to Mongo"))
.on("close", ()=> console.log("Disconnected from Mongo"))
.on("error", (error)=> console.log(error))

//Exports the connected Mongoose
module.exports = mongoose