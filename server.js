//Import all dependencies
require(`dotenv`).config()
const express = require(`express`)
const morgan = require(`morgan`)
const methodOverride = require(`method-override`)
const Animal = require("./models/animal")




///////////////////////
// create the app object
///////////////////////
const app = express()

///////////////
// Middleware
////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

///////////////
// Initial Route
//////////////

app.get("/animals/seed", (req, res)=>{
    const startAnimals = [
        {species: "Cat", extinct: true, location: "Usa", lifeExpectancy: 10},
        {species: "Dog", extinct: true, location: "Canada", lifeExpectancy: 1},
        {species: "Bird", extinct: true, location: "Spain", lifeExpectancy: 9}
    ]
    // Delete All animals
    Animal.deleteMany({}, (err, data)=> {
        Animal.create(startAnimals, (err, data)=>{
            res.json(data)
        })
    })
})

///////////////////
// Index Route (get => /animals)
/////////////////////
app.get("/animals", (req, res)=> {
    Animal.find({}, (err, animals)=> {
    res.render("animals/index.ejs", {animals})
    })
})

// New route (get => /animals/new)
app.get("/animals/new", (req, res)=> {
    res.render("animals/new.ejs")
})

app.post("/animals", (req, res)=> {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animal)=> {
        res.redirect("/animals");
    })
})

//edit route
app.get("/animals/:id/edit", (req,res)=> {
    const id = req.params.id 
    Animal.findById(id,(err, animal)=> {
        res.render('animals/edit.ejs', {animal})
    })
})

//
app.put("/animals/:id", (req, res)=> {
   const id = req.params.id
   req.body.extinct = req.body.extinct === "on" ? true : false
   Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal)=>{
       res.redirect("/animals")
   })
})

//delete route
app.delete("/animals/:id", (req, res)=> {
    const id =req.params.id
    Animal.findByIdAndRemove(id, (err, animal)=> {
        res.redirect("/animals")
    })
})

// The show route only shows one thing (get => /animals/:id)
app.get("/animals/:id", (req, res)=> {
    // grabs the id from params
    const id = req.params.id
    Animal.findById(id, (err, animals)=> {
        //render the template
        res.render("animals/show.ejs", {animals})
    })
})

//////////////////
//server listener
//////////////////
const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`listening on ${PORT}`))