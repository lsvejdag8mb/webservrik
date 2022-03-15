const url = require("url"); 
const fs = require("fs");
const crypto = require('crypto');

function hashPassword(password) {
  let pw2hash = password + "@G8MB7#";
  return crypto.createHash("sha256").update(pw2hash).digest('hex');
}

const FILE_USERS = "users.json";
let items = [];
if (fs.existsSync(FILE_USERS)) {
  items = JSON.parse(fs.readFileSync(FILE_USERS));
}

function users(req, res, params) {
  if (req.url.startsWith("/users/registry")) {
    res.writeHead(200, { "Content-type": "application/json" });

    //kontrola existence
    for (let item of items) {
      if (item.username == params.username) {
        let obj = {};
        obj.status = "error";
        obj.error = "username already exists";
        res.end(JSON.stringify(obj));
        return;
      }
    }
    
    let newItem = {};
    // napr. /crud/create?firstname=Test&lastname=Testicek&yob=2002
    newItem.id = Date.now();
    newItem.username = params.username;
    newItem.fullname = params.fullname;
    newItem.password = hashPassword(params.password);
    newItem.email = params.email;
    items.push(newItem);

    fs.writeFileSync(FILE_USERS, JSON.stringify(items));

    let obj = {};
    obj.status = "ok";
    obj.newId = newItem.id;
    obj.count = items.length;
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/users/login")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let obj = {};
    //TODO
    //obj.items = items;
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/users/logout")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let obj = {};
    //TODO
    //obj.items = items;
    res.end(JSON.stringify(obj));
  } else { //not found
    res.writeHead(404);
    res.end();
  }
}

exports.usersPOST = function(req, res) {
  let data = "";
  req.on('data', function (chunk) {
    data += chunk;
  })
  req.on('end', function () {
    let obj = {};
    if (data) {
      let params = JSON.parse(data);
      console.log(params);
      
      users(req, res, params); 
      
    } else {
      obj.status = "error";
      obj.error = "no data";
      res.writeHead(200, {"Content-type": "application/json"});
      res.end(JSON.stringify(obj));
    }
  });

}

