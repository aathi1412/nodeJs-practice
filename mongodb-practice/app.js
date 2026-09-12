const express = require('express');
const {ObjectId} = require("mongodb");
const { dbConnection, getDB } = require('./db');

const app = express();
app.use(express.json())

// connect db
let db;

dbConnection((err) => {
    if (err) {
        console.log(err);
        return;
    }

    db = getDB();

    app.listen(3000, () => {
        console.log("app listening on port 3000");
        console.log("http://localhost:3000");
    });
});


app.get("/", (req, res) => {
    res.json("welcome to api")
});

// app.get("/books", (req, res) => {
//     const books = [];
//
//     db.collection("books")
//         .find()
//         .forEach(book => books.push(book))
//         .then(() => {
//             res.status(200).json(books);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({err: err});
//         });
// });

app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(409).json("Not a valid id");
    }

    db.collection("books")
        .findOne({_id: new ObjectId(id)})
        .then((book) => {
            res.status((200)).json(book);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({err: err});
        });
})

app.get("/books", (req, res) => {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 10;

    const books = [];

    db.collection("books")
        .find()
        .skip(page * size)
        .limit(size)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({err: err});
        });

});

app.post("/books", (req, res) => {
    const book = req.body;

    db.collection("books")
        .insertOne(book)
        .then((result) => {
            res.status(200)
                .json({
                    message: "book uploaded successfully",
                    result: result
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({err: err});
        });
});

app.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(409).json("Not a valid id");
    }

    db.collection("books")
        .deleteOne({_id: new ObjectId(id)})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({err: err, msg: "couldn't delete"});
        });
});

app.patch("/books/:id", (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if(!ObjectId.isValid(id)){
        return res.status(409).json({err: "not a valid id"});
    }

    db.collection("books")
        .updateOne({_id: new ObjectId(id)}, {$set: updates})
        .then((result) => {
            res.status(200).json({result: result, msg: "Updated Successfully"})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({err: err, msg: "couldn't update"});
        });
});
