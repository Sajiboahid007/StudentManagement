const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3200, () => {
  console.log("Your port is running in 3200");
});

const connectsql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bank_account",
});

connectsql.connect(() => {
  console.log("connected");
});

app.get("/accout/details", (req, res) => {
  connectsql.query(
    "select * from account order by AccountNumber desc",
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});

app.post("/insertData", (req, res) => {
  const data = req.body;
  connectsql.query("insert into account set ?", data, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
});

app.delete("/deletefrom/:id", (req, res) => {
  const id = req.params.id;
  connectsql.query(
    "delete from account where AccountNumber = ?",
    id,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});
