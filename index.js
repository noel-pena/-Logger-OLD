import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

function logger(req, res, next){
    postText = (req.body["log"])
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

app.get("/logs", (req, res) => {
    res.render("logs.ejs");
});

app.post("/post", (req, res) => {
    console.log(req.body)
    logger();
    res.render("index.ejs");
    alert("your log was posted");
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});