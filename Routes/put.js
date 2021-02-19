var express = require('express')
var router = express.Router();

const put = require('../Database/Query/put');

// define the home page route
router.put('/', function (req, res) {
  res.status(200).json({"method":"PUT","Routes" : [{"/contact" : "BODY : name, email, phone", "function":"modifies the contact details"}]})
})

// updates the phone and name of given email
router.put('/contact', function (req, res) {
  
    //get user details from the body
    var {name, email, phone} = req.body;
    
    // if email is not present send eror
    if(email == undefined){
      return res.status(400).json({"message":"email missing in the body"})
    }
    
    // if both email and phone are not present send eror
    if(name == undefined && phone == undefined){
      return res.status(400).json({"message":"name and phone missing in the body"})
    }

    //update the contact
    put.update_contact(req.body)

    .then(data=>{
      return res.status(200).json(data);
    })
    .catch(err=>{
      return res.status(400).send(err);
    })

})

module.exports = router