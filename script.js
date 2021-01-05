const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const list = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "pug");

//ROOT///////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("index");
});
//For the following, "name" must be stored as a local variable to be accessed
app.post("/", (req, res) => {
    res.render("index", { name: req.cookies.username });
});

//LIST///////////////////////////////////////////////////////////////////////////////////////////
app.get("/list", (req, res) => {
    res.render("list", { name: req.cookies.username, list_item: req.cookies.list_item });
});
//The redirect allows the cookie to be stored
app.post("/list", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect("/list");
});

app.get("/login", (req, res) => {
    res.render("login", { name: req.cookies.username, list_item: req.cookies.list_item});
});

app.post("/login", (req, res) => {
    res.cookie("list_item", req.body.list_item);
    res.redirect("/login");
});

//SERVER////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log("working");
});

//////////////////////////////////////////////////////////NEXT///////////////////////////////////////////////////////////////////////////////////
//Redirect users to the root if there is no username entered. Don't allow passage without a username
//Once username is created, make two buttons on redirect page. One to change username and the other to enter the List
//Begin List
