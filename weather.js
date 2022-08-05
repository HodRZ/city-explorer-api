'use strict'
const axios = require('axios')

const cache = {};

async function weatherSearch(req, res) {
    if (cache[req.query.searchQuery] !== undefined) {
        res.send(cache[req.query.searchQuery]);
    } else {
        const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_KEY}`)
        try {
            const result = []
            weatherData.data.data.forEach((day) => {
                result.push(new Forecast(day))
            })
            cache[req.query.searchQuery] = result;
            res.send(result)
        } catch (error) {
            console.log(error, 'error :(')
            res.status(500).send('Something went wrong.')
        }
    }
}



class Forecast {
    constructor(data) {
        this.description = `Low of ${data.min_temp}, high of ${data.max_temp} with ${data.weather.description}`;
        this.date = data.valid_date;
    }
}

module.exports = { weatherSearch }

// http://localhost:3001/weather?lon=35.9239625&lat=31.9515694&searchQuery=amman