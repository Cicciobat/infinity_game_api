const express = require('express')
const path = require("path");
const app = express()
const jwt = require('jsonwebtoken')
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const e = require("express");
require('dotenv').config()
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).sendFile(path.join(__dirname, '/web/401.html'));
    }
}

const generateToken = (req, res, next) => {
    try {
        if (req.body.key && req.body.key === PRIVATE_KEY) {
            let key = req.body.key;
            req.token =  jwt.sign({'key': key}, SECRET_KEY, {
                expiresIn: '7 days',
                algorithm: 'HS256'
            })
            next()
        } else  {
            return res.status(401).send('Login denied - Unauthorized')
        }
    } catch (e) {
        console.log(e)
    }
}

app.get('/',  (req, res) => (
    res.status(200).sendFile(path.join(__dirname, '/web/index.html'), {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
))

app.get('/players', verifyToken,  (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '/assets/players.json'), {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.get('/teams', verifyToken, (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '/assets/teams.json'), {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-timestamp': Date.now(),
            'Age': 0
        }
    })
})

app.post('/auth', generateToken,  (req, res) => {
    res.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'x-timestamp': Date.now(),
        'Age': 0
    }
    return res.status(200).send(req.token)
})

app.post('/queue/result', verifyToken,  (req, res) => {
    const path = '/var/log/efootball_downloader';
    let currentDate = (new Date()).toLocaleDateString('en-CA');

    res.headers = {
        'Content-Type': 'text/plain; charset=UTF-8',
        'x-timestamp': Date.now(),
        'Age': 0
    }

    fs.writeFile(`${path}/${currentDate}.log`, req.body.message, {flag: 'a+'}, err => {
        console.log(err)
    })
    return res.status(200).send(req.token)
})


app.use((req, res) => {
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