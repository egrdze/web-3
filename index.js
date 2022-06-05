const express = require("express");
const { client_encoding } = require("pg/lib/defaults");
const app = express();

const { Comment } = require("./db/models");

//настройка темплейтов
app.set("view engine", "ejs");
app.use(express.static("public"));

//настройка запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//раутинг
app.get("/", async (req, res) => {
  let comments = await Comment.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "id"],
    },
    order: [["createdAt", "DESC"]],
  });
  console.log(comments);
  res.render("home", { comments });
});

app.get("/family", (req, res) => {
  res.render("family");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/quiz", (req, res) => {
  res.render("quiz");
});

app.post("/", async (req, res) => {
  try {
    const { name, comment } = req.body;
    await Comment.create({
      user: name,
      text: comment,
    });
  } catch (error) {
    throw new Error(error);
  }
  res.redirect("/#comments");
});

app.listen(3000, () => console.log("Listening on port 3000"));
