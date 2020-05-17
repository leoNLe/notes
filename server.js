const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");
const writefile = util.promisify(fs.writeFile);
const PORT = 3000;
const db = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json",), "utf-8"));

if(db === null) {
  db = [];
}
let id = 0;
const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));
//Serve entire public folder
server.use(express.static(path.join(__dirname, "/public")));


server.get("/notes", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

writeDB = () => {
  fs.writeFile(path.join(__dirname, "/db/db.json"),JSON.stringify(db), (err)=> {
    if(err) {
      return new Error("error in writing db.");
    }
  })
}

server.get("/api/notes", (req, res)=> {
  console.log('get');
  console.log(db);
  return res.json(db);
});
server.post("/api/notes", (req, res)=>{
  const newNote = req.body;
  db.push({id , title: newNote.title, text: newNote.text});
  id++;
  writeDB();
  return res.send(true);
})

server.delete("/api/notes/:id", (req, res)=>{
  const id = req.params.id;
  console.log(db);
  db.forEach( (note, idx)=> {
    if(note.id == id) {
      db.splice(idx,1);
    }
  })
  writeDB();
  res.json(db);
})

server.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(PORT, ()=> {
  console.log(`Started on port ${PORT}`)
})