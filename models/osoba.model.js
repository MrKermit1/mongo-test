const mongoose = require('mongoose')

const OsobaSchema = mongoose.Schema(
    {
        imie:{
            type: String,
            required: [true, "Wprowadź imie osoby"]
        },

        nazwisko:{
            type: String,
            required: [true, "Wprowadź nazwisko osoby"]
        },

        wiek:{
            type: Number,
            required: true,
            default: 0
        },
        
    },
    {
        timestamps: true
    }

)

const Osoba = mongoose.model("Osoba", OsobaSchema)
module.exports = Osoba