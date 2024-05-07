const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Osoba = require('./models/osoba.model.js')
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello");
})

app.post('/api/osoby', async (req, res) => {
    try {
       const osoba =  await Osoba.create(req.body)
       res.status(200).send(osoba)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/osoby', async (req, res) => {
    try {
        const osoby = await Osoba.find({})
        res.status(200).send(osoby)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//update po imieniu
app.put('/api/osoby/:imie', async (req, res) => {

    try {
        const {imie} = req.params

        const osoba = await Osoba.findOneAndUpdate({imie: imie}, req.body)

        if (!osoba) {
            return res.status(500).json({message: "Nie znaleziono osoby"})
        }

        const updatedOsoba = await Osoba.find({imie: req.body.imie})
        
        res.status(200).json(updatedOsoba)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

mongoose.connect("mongodb+srv://rybkowskiolafpraktyki:kbN4xRq47hm8vjUp@cluster0.iq1y8vb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Połączono z bazą")
    app.listen(3001, () => {
        console.log("Serwer dziala na porcie 3001")
    })    
})
.catch(() => {
    console.log("Nie połączono z bazą")
})
