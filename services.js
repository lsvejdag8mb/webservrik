const url = require("url"); 
const isTokenValid = require("./users.js").isTokenValid;

exports.services = function(req, res) {
  let params = url.parse(req.url, true).query;
  //verify logged user
  if (!isTokenValid(params.token)) {
    let obj = {};
    obj.status = "error";
    obj.error = "User not valid";
    res.end(JSON.stringify(obj));
    return;
  }

  
  if (req.url.startsWith("/api/test")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let obj = {};
    obj.appname = "my first service";
    obj.version = "0.0.0.1";
    obj.srvtime = new Date().toLocaleTimeString();
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/api/add")) {
    console.log(params.num1);
    console.log(params.num2);
    res.writeHead(200, { "Content-type": "application/json" });
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