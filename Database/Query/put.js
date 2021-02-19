const con = require("../dbconnect");


function update_contact({name, email, phone}){

    return new Promise(function(resolve,reject){

        var qry;

        if(name == undefined){
            // update the phone
            qry = `UPDATE \`phonebook\` SET \`phone\` = \"${phone}\" where \`email\` = \"${email}\"; `
        }
        else if(phone == undefined){
            // update the name
            qry = `UPDATE \`phonebook\` SET \`name\` = \"${name}\" where \`email\` = \"${email}\"; `
        }
        else{
            // update email and phone
            qry = `UPDATE \`phonebook\` SET \`name\` = \"${name}\" , \`phone\` = \"${phone}\" where \`email\` = \"${email}\"; `

        }
        
        con.query( qry, function(err,result,fields){
            console.log(result.affectedRows)
            
            
            if(err){
                reject({"message":"Can not connect to the Database"});
            }
            else if(result.affectedRows == 0){
                reject({"message":"Email not found"});
            }
            else{
                resolve({"message":"Contact Details updated!"})
            }
        })
    })
    
}



module.exports.update_contact = update_contact;
