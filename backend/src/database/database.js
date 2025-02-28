const mysql = require('mysql2');


// mysql Configuration 
  const db=mysql.createConnection({
  host: "localhost",
  user: "root" ,
  password: "",
  database: "ukcart",
  connectTimeout: 100000
}).promise();


// Connect to the database
db.connect().then(() => {
  console.log("connected database thread ID : ", db.threadId);
}).catch((err) => {
  console.error("error connecting database: ", err);
});


module.exports = db;