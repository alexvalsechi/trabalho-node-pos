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
    ${moment().format('YYYY-MM-DD hh:mm:ss')} - ${req.method} - ${req.protocol + '://' + req.headers.host + req.originalUrl}\n,
    {flag: 'a'}
  );
  resp.writeHead(201, { "content-type": "text/html" });
  resp.write(body);
  resp.status(201).send(rows);
});

router.put('/user', (req, res) => {
  const { body } = req
  const { name, email, password } = body
  const databaseConnection = new DatabaseConnection()
  const db = await databaseConnection.connect()
  const { rows } = await db.query(
     "update users set name = $1, email = $2, password = $3, created_at = $4, updated_at = $5 where id = $6 RETURNING *",
      [name, email, password, moment().format('YYYY-MM-DD hh:mm:ss'), moment().format('YYYY-MM-DD hh:mm:ss'), req.params.id]
  )
  resp.status(201).send(rows)
});

router.delete('/user/', (req, res) => {
    const databaseConnection = new DatabaseConnection()
    const db = await databaseConnection.connect()
    const { rows } = await db.query(
       "delete from users where id = $1 RETURNING *",
        [req.params.id])
    resp.status(200).send(rows)
}); 

module.exports = router;
