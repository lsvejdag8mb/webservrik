const http = require("http");
const fs = require("fs");
const url = require("url");

function main(req, res) {
    console.log(req.url);

    if (req.url == "/") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(fs.readFileSync("index.html"));
    } else if (req.url == "/script.js") {
        res.writeHead(200, {"Content-type": "text/javascript"});
        res.end(fs.readFileSync("script.js"));
    } else if (req.url == "/style.css") {
        res.writeHead(200, {"Content-type": "text/css"});
        res.end(fs.readFileSync("style.css"));
    } else if (req.url == "/favicon.ico") {
        res.writeHead(200, {"Content-type": "image/png"});
        res.end(fs.readFileSync("mimon.png"));
    } else if (req.url == "/test") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.appname = "my first service";
        obj.version = "0.0.0.1";
        obj.srvtime = new Date().toLocaleTimeString();
        res.end(JSON.stringify(obj));
    } else if (req.url.startsWith("/add")) {
        let params = url.parse(req.url, true).query;
        console.log(params.num1);
        console.log(params.num2);
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.action = "sum of two values";
        obj.number1 = parseInt(params.num1);
        obj.number2 = parseInt(params.num2);
        obj.sum = obj.number1 + obj.number2;
        res.end(JSON.stringify(obj));
    } else { //not found
        res.writeHead(404);
        res.end();
    }

}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server is running on http://localhost:8080 ...");
