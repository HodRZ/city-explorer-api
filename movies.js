'use strict'
const axios = require('axios')

const cache = {};

async function movieSearch(req, res) {
    if (cache[req.query.queryName] !== undefined) {
        res.send(cache[req.query.queryName])
    } else {
        const fetchData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${req.query.queryName}`).catch(function (error) { console.log(error) })
        // console.log(fetchData.data)
        try {
            const result = []
            fetchData.data.results.forEach((movie) => {
                result.push(new Movie(movie))
            })
            cache[req.query.queryName] = result;
            res.send(result)
        } catch (error) {
            console.log(error, 'error :(')
            res.status(500).send('Something went wrong.')
        }
    }
}

class Movie {
    constructor(data) {
        this.title = data.title;
        this.poster = `${process.env.MOVIE_IMG_URL}${data.poster_path}`;
        this.overview = data.overview
    }
}

module.exports = { movieSearch }