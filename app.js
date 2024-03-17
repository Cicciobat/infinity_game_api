const express = require('express')
const path = require("path");
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.static('public'));


app.get('/', (req, res) => (
    res.sendFile(path.join(__dirname, '/web/index.html'), {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
))

app.get('/players', (req, res) => {
    res.sendFile(path.join(__dirname, '/assets/players.json'), {
        headers: {
            'Content-Type': 'application/json',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.get('/teams', (req, res) => {
    res.sendFile(path.join(__dirname, '/assets/teams.json'), {
        headers: {
            'Content-Type': 'application/json',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.listen(3000, () => {
    console.log('Server listen at http://localhost:3000')
})