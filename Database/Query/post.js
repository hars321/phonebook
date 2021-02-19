const con = require("../dbconnect");


function validate_input(email){

    return new Promise(function(resolve,reject){

        var qry = `Select * from \`phonebook\` where \`email\` = \"${email}\";`
        
        con.query( qry, function(err,result,fields){
            
            if(err){
                reject({"message":"Error inserting data into the Database"})
            }
            else if (result.length != 0){
                // if user found reject it
                reject({"message":"A user with the given email already exists"})
            }
            else{
                // else accept the request
                resolve({"message":"User not found in the database"})
            }
            
        })
    })
    
}



function new_entry({name, email, phone}){

    
    return new Promise(function(resolve,reject){

        var qry;

        if(phone == undefined){
            qry = `INSERT INTO \`phonebook\` (\`email\`,\`name\`) VALUES (\"${email}\",\"${name}\");`
        }
        else{
            qry=`INSERT INTO \`phonebook\` (\`email\`,\`name\`, \`phone\`) VALUES (\"${email}\",\"${name}\",\"${phone}\");`
        }
        
        
        con.query( qry, function(err,result,fields){
            
            if(err){
                reject({"message":"Error inserting data into the Database"});
            }
            else{
                resolve({"message":"Data inserted successfully into the Database"});
            }
        })
    })
    
}


module.exports.validate_input = validate_input;
module.exports.new_entry = new_entry;