'use strict'
require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
// const weatherData = require('./data/weather.json')
const PORT = process.env.PORT
const { weatherSearch } = require('./weather.js')
const { movieSearch } = require('./movies.js')


app.listen(PORT, () => {
    console.log(`${PORT} Radio!`)
})

app.get('/weather', weatherSearch)

app.get('/movies', movieSearch)

app.get('/', (req, res) => {
    res.send('welcome')
})
