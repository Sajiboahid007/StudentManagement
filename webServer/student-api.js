const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const mySql = require("mysql");

app.listen(3000, () => {
  console.log("Running on 3000 port");
});

const mysqlConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookmanagement",
});

mysqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.get("/student/GetAll", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM students ORDER BY Id DESC",
    function (err, result, fields) {
      return res.send(err ? err : result);
    }
  );
});

app.get("/student/GetById/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    return res.send("Id not found");
  }
  mysqlConnection.query(
    `SELECT * FROM students WHERE Id = ${id}`,
    function (err, result, fields) {
      return res.send(err ? err : result);
    }
  );
});

app.put("/student/Update/:id", (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    return res.send("Id not found");
  }
  const data = [
    req.body.FirstName,
    req.body.LastName,
    req.body.Age,
    req.body.DepartmentName,
    req.body.Email,
    req.params.id,
  ];
  mysqlConnection.query(
    "update students set FirstName = ?, LastName = ?, Age = ?, DepartmentName = ?, Email = ? where Id = ?",
    data,
    function (err, result, fields) {
      return res.send(err ? err : result);
    }
  );
});

app.post("/student/Save", (req, res) => {
  const data = req?.body;
  // res.send(data);
  mysqlConnection.query(
    "INSERT INTO students SET ?",
    data,
    function (err, result, fields) {
      return res.send(err ? err : result);
    }
  );
});

app.delete("/student/delete/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    "delete from students where  Id = ?",
    id,
    function (err, result) {
      if (err) throw err;
      return res.send(result);
    }
  );
});

// app.get("/student/save", (req, res) => {
//   const data = req?.body;
//   if (!data || !data?.FirstName) {
//     return res.send("Data cannot be empty");
//   }

//   const queryBuilder = `INSERT INTO students(FirstName, LastName, Age, DepartmentName, Email)
//                         VALUES ('${data?.FirstName}', '${data?.LastName}', '${data?.Age}', '${data?.DepartmentName}', '${data?.Email}');`;

//   mysqlConnection.query(queryBuilder, (err, result, fields) => {
//     return res.send(err ? err : result);
//   });
// });
