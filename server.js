const express = require('express')
const morgan = require('morgan')
const MOVIEDEX = require('./movies-data-small.json')

const app = express()
app.use(morgan('dev'))

app.get('/movie', function handleGetMovie(req, res){
    let response = MOVIEDEX;

    if(req.query.genre){
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if(req.query.country){
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    if(req.query.avg_vote){
        response = response.filter(movie => 
            movie.avg_vote >= Number(req.query.avg_vote)
        )
    }

    res.json(response)
})

app.listen(8000, ()=>{
    console.log('Server listening to port 8000')
})