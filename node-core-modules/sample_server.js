import http from "http";
import fs from "node-core-modules/fs";


const server =
    http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("Welcome to Cartoon World");
    }
    else if (req.url === "/video") {
        const readStream = fs.createReadStream("./1.mp4");
        res.writeHead(200, {"content-type": "video/mp4"});
        readStream.pipe(res);
    }
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
    console.log("http://localhost:3000");
});