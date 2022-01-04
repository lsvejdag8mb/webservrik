const http = require("http");

function main(req, res) {
    res.end("hello!");
}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server is running on http://localhost:8080 ...");
