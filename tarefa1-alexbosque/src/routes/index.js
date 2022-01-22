const express = require("express");
const fs = require("fs").promises;
const DatabaseConnection = require("./../config/connection-db");

const router = express.Router();

router.get("/users", async (req, resp) => {
  const databaseConnection = new DatabaseConnection();
  const db = await databaseConnection.connect();
  const { rows } = await db.query("select * from users");
  resp.send(rows);
});

router.post("/user", async (req, resp) => {
  const { body } = req;
  const { name, email, password, createdAt, updatedAt } = body;
  const databaseConnection = new DatabaseConnection();
  const db = await databaseConnection.connect();
  const { rows } = await db.query(
    "insert into users (name, email, password, createdAt, updateAt) values($1, $2, $3, $4, $5) RETURNING *",
    [name, email, password, createdAt, updatedAt]
  );
  bodyReq = new Date().getTime();
  await fs.writeFile(
    "files/log.txt",
    JSON.stringify([bodyReq], null, 4)
  );
  resp.writeHead(201, { "content-type": "text/html" });
  resp.write(body);
  resp.status(201).send(rows);
});

router.put('/user', (req, res) => {
  const { body } = req;
  const { name, email, password } = req.body;
  req[index] = name; 
  return res.json(req);
});

router.delete('/user/', (req, res) => {
  const { index } = req.params; 
  req.splice(index, 1); 
  return res.send();
}); 

module.exports = router;
