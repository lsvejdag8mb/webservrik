const http = require("http");
const fs = require("fs");
const url = require("url"); 
//...system modules

const myservices = require("./services.js"); //module from my app
const crud = require("./crud.js").crudPOST; //function from my module
const users = require("./users.js").usersPOST; //function from my module

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
    } else if (req.url.startsWith("/api/")) {
        myservices.services(req, res);
    } else if (req.url.startsWith("/crud/")) {
        crud(req, res);
    } else if (req.url.startsWith("/users/")) {
        users(req, res);
    } else { //not found
        res.writeHead(404);
        res.end();
    }

}

let srv = http.createServer(main);
srv.listen(8080);

console.log("Server is running on http://localhost:8080 ...");
