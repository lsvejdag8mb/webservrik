const url = require("url"); 

let items = [];

exports.crud = function(req, res) {
  if (req.url.startsWith("/crud/create")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let newItem = {};
    newItem.firstName = "Bob";
    newItem.lastName = "Bobik";
    newItem.yob = 2000;
    items.push(newItem);

    let obj = {};
    obj.status = "ok";
    obj.count = items.length;
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/crud/read")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let obj = {};
    obj.items = items;
    res.end(JSON.stringify(obj));
  } else { //not found
    res.writeHead(404);
    res.end();
  }
}
