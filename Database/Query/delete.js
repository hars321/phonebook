const con = require("../dbconnect");


function delete_contact( email ){

    return new Promise(function(resolve,reject){


        if(email == undefined){
            reject({"message":"Email not present in the url"})            
        }

        var qry = `Delete from \`phonebook\` where \`email\` = \"${email}\"; `;
       
        
        con.query( qry, function(err,result,fields){            
            
            if(err){
                reject({"message":"Can not connect to the Database"});
            }
            else if(result.affectedRows == 0){
                reject({"message":"Email not found in the Database"});
            }
            else{
                resolve({"message":"Contact Deleted!"})
            }
        })
    })
    
}



module.exports.delete_contact = delete_contact;
