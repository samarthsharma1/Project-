const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

// database connection 
const db = require('./database/database');

// language change router
const lanEngine = require('./Routes/lanEngineRoute')

const app = express()

app.use(body_parser.json())     // to parse incoming requests into json format
app.use(cors())
dotenv.config();

app.get('/', (req, res, next) => {
    // console.log(req);
    res.send('hiii')
})

app.use('/translate', lanEngine)

db.sync()
    .then(() => {
        app.listen(5000);
        console.log('app is running at port 5000')
    })
    .catch(err => console.log(err))
//
