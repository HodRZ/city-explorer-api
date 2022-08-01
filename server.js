'use strict'
const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
const weatherData = require('./data/weather.json')
const PORT = (process.env.PORT || 3001)

class Forecast {
    constructor(data) {
        this.description = `Low of ${data.low_temp}, high of ${data.high_temp} with ${data.weather.description}`;
        this.date = data.datetime;
    }
}

app.listen(PORT, () => {
    console.log(`${PORT} Radio!`)
})

app.get('/weather', (req, res) => {
    const selctedCity = {
        lon: req.query.lon,
        lat: req.query.lat,
        city: req.query.searchQuery.toLowerCase()
    }
    const found = weatherData.find((city) => {
        return (city.city_name.toLowerCase() === selctedCity.city)
    })
    const result = []
    try {
        found.data.forEach((day) => {
            result.push(new Forecast(day))
            res.send(result)
        })
    } catch (error) {
        console.log('error :(')
        res.status(500).send('Something went wrong.')
    }

})