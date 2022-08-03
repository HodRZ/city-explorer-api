'use strict'
require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
const weatherData = require('./data/weather.json')
// const PORT = (process.env.PORT || 3001)
const { weatherSearch } = require('./weather.js')
const { movieSearch } = require('./movies.js')


app.listen(3001, () => {
    console.log(`3001 Radio!`)
})

app.get('/weather', weatherSearch)

app.get('/movies', movieSearch)
