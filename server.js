const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");
const writefile = util.promisify(fs.writeFile);
const PORT = 3000;

const db = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json",), "utf-8"));

const server = express();


server.get("/notes", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

server.get("/api/notes", (req, res)=> {
  return res.json(db);
});

server.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

server.listen(PORT, ()=> {
  console.log(`Started on port ${PORT}`)
})