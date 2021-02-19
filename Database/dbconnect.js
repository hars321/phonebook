const dotenv = require('dotenv');
dotenv.config();

const mysql=require('mysql');

const host = process.env.DB_HOST;

// Get the User for DB from Environment or use default
const user = process.env.DB_USER;

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS;

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE;


const con = mysql.createConnection({
    host, user, password, database,
  });

con.connect(function (err) {
      if(err){
          console.log("cannot connect to the database");
      }
      else{
          console.log("connected successfully");
      }    
  })

  
  
  module.exports=con;
  