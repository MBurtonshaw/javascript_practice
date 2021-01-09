const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
class Person {
    constructor(id, name, item) {
        this.id = id;
        this.name = name;
        this.item = item;
    }
};
const personList = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static("public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render('layout');
});

app.post("/", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect("/item");
});

app.get("/item", (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render("item");
    } else {
        res.redirect("/");
    }
});

app.post("/item", (req, res) => {
    res.cookie("list_item", req.body.list_item);
    res.redirect("/list");
});

app.get("/list", (req, res) => {
    const item = req.cookies.list_item;
    if (item) {
        let newPerson = new Person(personList.length, req.cookies.username, req.cookies.list_item);
        personList.push(newPerson);
        res.render('list');
        console.log(personList);
    } else {
        res.redirect('/item');
    }
});

////ERROR MESSAGE////
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.send(JSON.stringify({ok: false, message: err.message}));
});

////SERVER////
app.listen(3000, () => {
    console.log("working");
});