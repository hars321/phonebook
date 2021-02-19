const express = require('express');
const { query } = require('../Database/dbconnect');
const router = express.Router();
const deleteFromDB = require('../Database/Query/delete');

// define the home page route
router.delete('/', function (req, res) {
  res.status(200).json({"method":"Delete","Routes" : [{"/contact" :"Sample url : /contact?email@gmail.com", "function":"Deletes the contact from the database", "Query Parameters" : "email"}]})
})

//  url : /contact?email=123
router.delete('/contact', function (req, res) {

  var email = req.query.email

  deleteFromDB.delete_contact(email)
  .then(data=>{
    return res.status(200).send(data)
  })
  .catch(err=>{
    return res.status(400).send(err);
  })
})

module.exports = router