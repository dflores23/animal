// import the connected mongoose object
const mongoose = require("./connection")

///////////////
// Our model
///////////////
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
}) 

const Animal = model('Animal', animalSchema)

// export the model
module.exports = Animal