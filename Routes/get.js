const express = require('express')
const router = express.Router();
 
const get = require('../Database/Query/get');


// define the home page route
router.get('/',function(req, res){
  res.status(200).json({"method":"GET","Routes" : [{"/contact" : "Sample url : /contact?name=123&email=email@gmail.co&page=1", "function":"returns details of a specific contact", "Query Parameters" : "name, email, page"}, {"/all-contacts" : "Sample url : /all-contacts?page=1", "function":"returns details of all the contacts", "Query Parameters" : "page"}]})
})


// GET /contact?phone=123&email=email@gmail.co&page=1
router.get('/contact', function (req, res) {
  
  // if name and email are not present send error
  var name = req.query.name;
  var email = req.query.email;
  var page = req.query.page;

  if(name == undefined && email == undefined){
    return res.status(400).json({"message":"Name and Email missing in the url"})
  }

  if(page == undefined){
    return res.status(400).json({"message":"Page Number missing from the url"});
  }

  
  var body = {
    "email": email,
    "name": name,
    "page": page
  }
  

  get.findUser(body)
  .then(data=>{
    return res.status(200).json(data);
  
  })
  .catch(err=>{
    return res.status(500).json(err);
  })
  
  

})


// GET /all-contacts?page=1
router.get('/all-contacts', function (req, res) {

  if(req.query.page == undefined){
    return res.status(400).json({"message":"Page number missing in the url"})
  }

  var body = {
    "page" : req.query.page
  }

  get.findAllUsers(body)

  .then(data=>{
    return res.status(200).json(data);
  
  })
  .catch(err=>{
    return res.status(500).json(err);
  })
  
})



module.exports = router