const { MongoClient } = require('mongodb');

let db;
const uri = "mongodb+srv://aathi9211_db_user:LU7rmgCvqGFTfzsB@aathi.vkybgvd.mongodb.net/book_store";

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