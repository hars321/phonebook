const con = require("../dbconnect");

// routes get all contacts
// get contacts with given name or email address 
function findUser({name, email, page}){
    
    return new Promise(function(resolve,reject){

        var elements_on_page = 10;

        var page_upper_bound = page * elements_on_page;

        var page_lower_bound = page_upper_bound - elements_on_page;

        var qry;

        // if there is no email => find by name
        if (email == undefined){
            
            qry = `Select * from \`phonebook\` where \`name\` = \"${name}\" LIMIT ${page_lower_bound},${page_upper_bound};`
        
        }
        // if there is no name => find by email
        else if (name == undefined) {
            
            qry = `Select * from \`phonebook\` where \`email\` = \"${email}\" LIMIT ${page_lower_bound},${page_upper_bound};`
        
        }

        // find by name and email 
        else{
            
            qry = `Select * from \`phonebook\` where \`email\` = \"${email}\" OR \`name\` = \"${name}\" LIMIT ${page_lower_bound},${page_upper_bound};`
        
        }
        
        
        con.query( qry, function(err,result,fields){
            
            if(err){
                reject({"message":"Cannot connect to the server"});
            }
            else if(result.length == 0){
                reject ({"message":"No more data found"});
            }
            else{
                resolve(result);
            }
        })
    })
    
}


function findAllUsers({page}){
    
    console.log(page)
    return new Promise(function(resolve,reject){

        var elements_on_page = 10;

        var page_upper_bound = page * elements_on_page;

        var page_lower_bound = page_upper_bound - elements_on_page;

        var qry = `Select * from \`phonebook\` ORDER BY name ASC LIMIT ${page_lower_bound},${page_upper_bound};`
        
        con.query( qry, function(err,result,fields){
            
            if(err){
                reject({"message":"Cannot connect to the server"});
            }
            else if(result.length == 0){
                reject ({"message":"No more data found"});
            }
            else{
                resolve(result);
            }
        })
    })
    
}





module.exports.findUser = findUser;
module.exports.findAllUsers = findAllUsers;