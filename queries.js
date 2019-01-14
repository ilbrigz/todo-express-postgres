const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "todo",
  port: 5432
});
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const getTodos = (request, response) => {
  pool.query("SELECT * FROM todos", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getTodosById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM todos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTodos = (request, response) => {
  const { task } = request.body;
  pool.query(
    "INSERT INTO todos (task) VALUES ($1)  RETURNING id",

    [task],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(result.rows[0]);
    }
  );
};

const updateTodos = (request, response) => {
  const id = parseInt(request.params.id);
  const { task } = request.body;
  pool.query(
    "UPDATE todos SET name = $1 WHERE id = $3",
    [task, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Todos modified with ID: ${id}`);
    }
  );
};

const deleteTodos = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM todos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(response);
    response.status(200).send(`Tasks deleted with ID: ${id}`);
  });
};

module.exports = {
  getTodos,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos
};
