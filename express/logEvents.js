const fs = require('node-core-modules/fs');
const fsPromises = require('node-core-modules/fs').promises;
const path = require('node-core-modules/path');
const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

const logEvents = async (message, logName) => {

    const logDate = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${logDate}\t${uuid()}\t${message}\n`
    try{
        if (!fs.existsSync(path.join(__dirname, "logs"))){
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }
        await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    }catch (err){
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLogs.txt");
    next();
}
module.exports = {logEvents, logger};