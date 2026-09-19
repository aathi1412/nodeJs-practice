const express = require('express');
const app = express();
const {logger} = require('./logEvents');
const cors = require('cors');
const errorHandler = require('./ErrorHandler')
const PORT = 3000;

app.use(logger);

const whiteList = ["http://localhost:3000", "http://localhost:5173"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error("CORS not Allowed"))
        }
    },
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/', require("./routes/users"));
app.all('/*splat', (req, res) => {
    res.status(404).send("Not Found: 404");
});


app.use(errorHandler);
app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`, `http://localhost:${PORT}`));