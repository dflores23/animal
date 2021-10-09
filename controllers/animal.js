////////////
//Import dependencies
/////////////
const express = require(" express")
const Animal = require("../models/animal")

////////////////////
//create router
/////////////////////
const router = express.Router();

/////////////////////////
// routes
////////////////////////


router.get("/seed", (req, res)=>{
    const startAnimals = [
        {species: "Cat", extinct: true, location: "Usa", lifeExpectancy: 10},
        {species: "Dog", extinct: true, location: "Canada", lifeExpectancy: 6},
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
router.get("/", (req, res)=> {
    Animal.find({}, (err, animals)=> {
    res.render("animals/index.ejs", {animals})
    })
})

// New route (get => /animals/new)
router.get("/new", (req, res)=> {
    res.render("animals/new.ejs")
})

router.post("/", (req, res)=> {
    req.body.extinct = req.body.extinct === "on" ? true : false
    Animal.create(req.body, (err, animal)=> {
        res.redirect("/animals");
    })
})

//edit route
router.get("/:id/edit", (req,res)=> {
    const id = req.params.id 
    Animal.findById(id,(err, animal)=> {
        res.render('animals/edit.ejs', {animal})
    })
})

//
router.put("/:id", (req, res)=> {
   const id = req.params.id
   req.body.extinct = req.body.extinct === "on" ? true : false
   Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal)=>{
       res.redirect("/animals")
   })
})

//delete route
router.delete("/:id", (req, res)=> {
    const id =req.params.id
    Animal.findByIdAndRemove(id, (err, animal)=> {
        res.redirect("/animals")
    })
})

// The show route only shows one thing (get => /animals/:id)
router.get("/:id", (req, res)=> {
    // grabs the id from params
    const id = req.params.id
    Animal.findById(id, (err, animals)=> {
        //render the template
        res.render("animals/show.ejs", {animals})
    })
})

////////////////////////
// Export the router
/////////////////////////
module.exports = router;
