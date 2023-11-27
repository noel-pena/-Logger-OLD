import express from "express";
import bodyParser from "body-parser";
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let postText = ""

// const data = new Uint8Array(Buffer.from(`<%- include("partials_notes/header.ejs") %><h1><%= ${postText} %></h1><%- include("partials_notes/footer.ejs") %>`));

const newData = (noteText) => {
    return new Uint8Array(Buffer.from(`<%- include("partials_notes/header.ejs") %><h1> ${noteText} </h1><%- include("partials_notes/footer.ejs") %>`))
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


function logger(req, res, next){
    postText = (req.body["log"]);
    let notesArr = [];
    let notesObj = {};
    notesObj["01"] = (req.body["title"]);
    notesObj["02"] = (req.body["body"]);
    notesArr.push(notesObj);
    console.log(notesArr);
    next();
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
    res.redirect("https://noel-pena.github.io/Portfolio/")
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
});

let count = 0;

app.use(logger)

app.post("/posted", (req, res) => {
    postText = (req.body["body"]);
    console.log(postText);
    res.render("posted.ejs", {postEm: postText});
    writeFile('./views/notes/notes' + count + '.ejs', newData(postText), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
    count++;
});

let savedLogs = __dirname + "/views/notes/notes" + count + ".ejs";

app.get("/notes", (req, res) => {;
    return res.render("./notes/notes0.ejs", {postEm: postText});
});


app.get("/logs", (req, res) => {
    console.log('app get logs');
    postText = (req.body["body"]);
    res.render("logs.ejs", {saveEm: savedLogs, postEm: postText});
    notesArr.push
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// let notes = [{
//     title: (req.body["title"]),
//     body: (req.body["body"])
// }]
// make and array and then push the object 
// let notesArr = []
// {
//     Title: string
//     Body: string
// }

