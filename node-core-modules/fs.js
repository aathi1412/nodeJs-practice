const fs = require("node-core-modules/fs");



fs.readFile("text.txt", {encoding: "utf8"}, (err, data) => {
    if (err) throw err;
    console.log(data);

    fs.writeFile("res.txt", data, (err) => {
        if (err){
            console.error(err);
        }
        console.log("done");
    });

});



console.log("End");