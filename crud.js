const url = require("url"); 
const fs = require("fs");

const isTokenValid = require("./users.js").isTokenValid;

const FILE_ITEMS = "cruditems.json";
let items = [];
if (fs.existsSync(FILE_ITEMS)) {
  items = JSON.parse(fs.readFileSync(FILE_ITEMS));
}

function crud(req, res, params) {
  //TODO overeni tokenu
  
  if (req.url.startsWith("/crud/create")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let newItem = {};
    // napr. /crud/create?firstname=Test&lastname=Testicek&yob=2002
    newItem.id = Date.now();
    newItem.firstName = params.firstname;
    newItem.lastName = params.lastname;
    newItem.yob = params.yob;
    items.push(newItem);

    fs.writeFileSync(FILE_ITEMS, JSON.stringify(items));

    let obj = {};
    obj.status = "ok";
    obj.newId = newItem.id;
    obj.count = items.length;
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/crud/read")) {
    res.writeHead(200, { "Content-type": "application/json" });
    let obj = {};
    obj.items = items;
    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/crud/update")) {
    res.writeHead(200, { "Content-type": "application/json" });

    let obj = {};
    obj.status = "error";
    obj.error = "item not found";
    for (let i=0; i<items.length; i++) {
      if (items[i].id == params.id) {
        items[i].firstName = params.firstname;
        items[i].lastName = params.lastname;
        items[i].yob = params.yob;

        fs.writeFileSync(FILE_ITEMS, JSON.stringify(items));
        obj.status = "ok";
        obj.error = undefined;
        break;
      }
    }

    res.end(JSON.stringify(obj));
  } else if (req.url.startsWith("/crud/delete")) {
    res.writeHead(200, { "Content-type": "application/json" });

    let obj = {};
    obj.status = "error";
    obj.error = "item not found";
    for (let i=0; i<items.length; i++) {
      if (items[i].id == params.id) {
        items.splice(i, 1);
        fs.writeFileSync(FILE_ITEMS, JSON.stringify(items));
        obj.status = "ok";
        obj.error = undefined;
        break;
      }
    }

    res.end(JSON.stringify(obj));
  } else { //not found
    res.writeHead(404);
    res.end();
  }
}

exports.crudPOST = function(req, res) {
  let data = "";
  req.on('data', function (chunk) {
    data += chunk;
  })
  req.on('end', function () {
    let obj = {};
    if (data) {
      let params = JSON.parse(data);
      console.log(params);

      //verify logged user
      if (isTokenValid(params.token)) {
        crud(req, res, params);       
      } else {  
        obj.status = "error";
        obj.error = "User not valid";
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify(obj));
      }
      
    } else {
      obj.status = "error";
      obj.error = "no data";
      res.writeHead(200, {"Content-type": "application/json"});
      res.end(JSON.stringify(obj));
    }
  });

}

