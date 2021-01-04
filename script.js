const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser);
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index");
});

/*app.get("/list", (req, res) => {
    res.render("list");
});

app.post("/list", (req, res) => {
    res.render("list"); //, {name: res.cookies.username});
});*/

app.listen(3000, () => {
    console.log("working");
});
