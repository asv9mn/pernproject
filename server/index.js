const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/runners", async (req, res) => {
  try {
    const { name, dateOfBirth } = req.body;
    const checkUser = await pool.query("SELECT * FROM runner WHERE name=$1", [
      name,
    ]);

    if (checkUser.rows.length !== 0) {
      res.status(403);
      res.json("User is already registered!");
    } else {
      const registerUser = await pool.query(
        "INSERT INTO runner (name, dateOfBirth) VALUES($1, $2) RETURNING *",
        [name, dateOfBirth]
      );

      res.json(registerUser.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/runners", async (req, res) => {
  try {
    const getUsers = await pool.query("SELECT * FROM runner");
    res.json(getUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/runners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM runner WHERE runner_id=$1",
      [id]
    );
    res.json(deleteUser);
  } catch (error) {}
});

module.exports = app;

app.listen(5000, () => {
  console.log("Server has started on Port 5000");
});
