const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@aathi.vkybgvd.mongodb.net/book_store`;

const dbConnection = (cb) => {
    MongoClient.connect(url)
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