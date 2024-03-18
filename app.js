const express = require('express')
const path = require("path");
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const PORT = process.env.PORT


app.use(express.static('public'));


app.get('/', (req, res) => (
    res.status(200).sendFile(path.join(__dirname, '/web/index.html'), {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
))

app.get('/players', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/assets/players.json'), {
        headers: {
            'Content-Type': 'application/json',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.get('/teams', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/assets/teams.json'), {
        headers: {
            'Content-Type': 'application/json',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '/web/404.html'), {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.listen(PORT, () => {
    console.log('Server listen at http://localhost:' + PORT)
})