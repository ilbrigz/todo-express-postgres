const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(cors());
const port = 3000;
const {
  getTodos,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos
} = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/Todos", getTodos);
app.get("/Todos/:id", getTodosById);
app.post("/Todos", createTodos);
app.put("/Todos/:id", updateTodos);
app.delete("/Todos/:id", deleteTodos);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
