const express = require('express');
const app = express();
const {logger} = require('./logEvents');
const cors = require('cors');
const errorHandler = require('./ErrorHandler')
const PORT = 3000;

app.use(logger);

const whiteList = ["http://localhost:63342", "http://localhost:5173"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1){
            callback(null, true);
        }else{
            callback(new Error("CORS not Allowed"))
        }
    },
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/name', (req, res, next) => {
    next();
}, (req, res) => {
    res.send('aathi');
});
app.all('/*splat', (req, res) => {
    res.status(404).send("Not Found: 404");
});


app.use(errorHandler);
app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`, 'http://localhost:3000'));