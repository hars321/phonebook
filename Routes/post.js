var express = require('express')
var router = express.Router();

const post = require('../Database/Query/post');

// define the home page route
router.post('/', function (req, res) {
  res.status(200).json({"method":"POST","Routes" : [{"/contact" : "BODY : name, email, phone", "function":"adds new contact into the database"}]})
})

// adds new field into the database
router.post('/contact', function (req, res) {
  
    //get user details from the body
    var {name, email, phone} = req.body;
    
    // check if email and name exist
    if(name == undefined || email == undefined){
      return res.status(400).send({"message":'Name or Email missing in the url'});
    }
    
    // check if user with current email exists in the database
    post.validate_input(email)

    .then(data=>{

      // insert the user into the database

        post.new_entry(req.body)

        // data inserted into the data base successfully 
        .then(data=>{
          return res.status(200).send(data);
        })
        
        // error in inserting data into the data base
        .catch(err=>{
          return res.status(400).send(err);
        })

    })

    // error connecting to the database
    .catch(err=>{
      return res.status(400).send(err);
    })

})

module.exports = router