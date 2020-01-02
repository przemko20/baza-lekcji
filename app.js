const express = require('express')
const mongoose = require('mongoose')
const lessons = require('./routes/lessons')

const app = express()

mongoose.connect('mongodb://localhost/classes')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect"))

app.use(express.json())
app.use('/api/lessons', lessons)


app.get('/', (req,res) => {
    res.send("Dupa")
})


const PORT = process.env.PORT || 3000 // PORT
app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`)})
