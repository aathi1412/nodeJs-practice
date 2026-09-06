const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'errLog.txt');
    console.log(err.message);
    res.status(500).send(err.message);
}

module.exports = errorHandler