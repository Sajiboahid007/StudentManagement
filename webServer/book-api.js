const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const mySql = require("mysql");

app.listen(3000, () => {
  console.log("Running on port 3000");
});

const mysqlConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookmanagement",
});

mysqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/Book/GetById/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    return res.send("Id not found");
  }
  mysqlConnection.query(
    `SELECT * FROM Books WHERE Id = ${id}`,
    function (err, result, fields) {
      return res.send(err ? err : result);
    }
  );
});

app.get("/Book/GetAll", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM books",

    function (err, result, fields) {
      if (err) throw err;
      return res.send(result);
    }
  );
});

app.put("/Book/Update/:id", (req, res) => {
  const data = [
    req.body.BookName,
    req.body.Author,
    req.body.Publisher,
    req.params.id,
  ];
  mysqlConnection.query(
    "update Books set BookName = ?, Author = ?, Publisher = ? where Id = ?",
    data,
    function (err, result, fields) {
      if (err) throw err;
      return res.send(result);
    }
  );
});

app.post("/Book/Save", (req, res) => {
  const data = req?.body;

  mysqlConnection.query(
    // `INSERT INTO books(BookName, Author, Publisher)
    //   VALUES ('${data?.BookName}','${data?.Author}','${data?.Publisher}')`,
    `INSERT INTO Books SET ?`,
    data,
    function (err, result, fields) {
      if (err) throw err;
      return res.send(result);
    }
  );
});

app.delete("/deleteBook/:id", (req, res) => {
  const data = req.params.id;
  mysqlConnection.query(
    "delete from books where Id = ?",
    data,
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
});
