const express = require("express");
const app = express();
const mySql = require("mysql");

app.listen(3000, () => {
  console.log("Running on 3000 port");
});

const mySqlConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookmanagement",
});

mySqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

app.get("/bookinhand/GetAll", (req, res) => {
  mySqlConnection.query(
    `SELECT BH.Id, ST.FirstName,ST.LastName,BK.BookName,BH.OccupiedDate,BH.ReturnDate 
    FROM booksinhand BH INNER JOIN students ST ON ST.Id = BH.StudentId 
    INNER JOIN books BK ON BK.Id = BH.BookId;`,

    function (err, result, field) {
      if (err) throw err;
      res.send(result);
    }
  );
});
