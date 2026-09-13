const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;
const uri = `mongodb+srv://${process.env.userName}:${process.env.password}@aathi.vkybgvd.mongodb.net/book_store`;

const dbConnection = (cb) => {
    MongoClient.connect(uri)
        .then((client) => {
            db = client.db();
            cb();
        })
        .catch((err) => {
            console.log(err);
            cb(err);
        })
}
const getDB = () => db;

module.exports = {
    dbConnection,
    getDB
}