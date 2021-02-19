const con = require("../dbconnect");
const jwt = require("jsonwebtoken");

// checks if email exists in the database
function validate_email(email){
    return new Promise(function(resolve, reject){

        var qry = `Select * from \`register\` where \`email\` = \"${email}\";`

        con.query(qry,function(err, result, fields){
            if(err){
                reject({"message":"Error connecting to the Database"})
            }
            else if(result.length !=0 ){
                reject({"message":"Email already exists in the Database"})
            }
            else{
                resolve({"message":"Valid Email"});
            }
        })
    })
}


// logs in user and returns jwt token
function login(body){

    var {email,password} = body;
    
    return new Promise(function(resolve,reject){

        if(email == undefined || password == undefined){
            reject({"message":"email or password missing "})
        }

        var qry = `Select * from \`register\` where \`email\` = \"${email}\" and \`password\` = \"${password}\";`
        
        con.query( qry, function(err,result,fields){
            
            if(err){
                reject({"message":"Error connecting to the Database"})
            }
            else if (result.length == 0){
                // if user found reject it
                reject({"message":"Email or Password is incorrect"})
            }
            else{
                // generate token 
                const accessToken = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET)
                resolve({accessToken:accessToken});
                
            }
            
        })
    })
    
}

// signup user and returns jwt token
function signup(body){

    var {email,password} = body;

    return new Promise(function(resolve,reject){

        if(email == undefined || password == undefined){
            reject({"message":"email or password missing "})
        }

        validate_email(email)
        .then(data=>{
            // add email and password into database
            var qry = `INSERT INTO \`register\` (\`email\`, \`password\`) VALUES ( \"${email}\", \"${password}\");`

            con.query( qry, function(err,result,fields){
            
                if(err){
                    reject({"message":"Error connecting to the Database"})
                }
                else if (result.affectedRow == 0){
                    // if user found reject it
                    reject({"message":"Error in inserting the data"})
                }
                else{
                    // else accept the request
                    const accessToken = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET)
                    resolve({accessToken:accessToken});
                }
                
            })
        })
        .catch(err=>{
            reject(err)
        })
        
    })
    
}

module.exports.login = login;
module.exports.signup = signup;