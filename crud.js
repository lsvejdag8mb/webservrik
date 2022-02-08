const url = require("url"); 

let items = [];

exports.crud = function(req, res) {
  if (req.url.startsWith("/crud/create")) {
    let params = url.parse(req.url, true).query;
    res.writeHead(200, { "Content-type": "application/json" });
    let newItem = {};
    // napr. /crud/create?firstname=Test&lastname=Testicek&yob=2002
    newItem.firstName = params.firstname;
    newItem.lastName = params.lastname;
    newItem.yob = params.yob;
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
