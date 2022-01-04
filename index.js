const http = require("http");

function main(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html><body>Hello HTML!</body></html>");
}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server is running on http://localhost:8080 ...");
