# phonebook
The PHONEBOOK API allows users to store contact details and Access the stored contacts (name email phone).
-------------------------------------------------------------------------------------------------
# Making a Request
-----------------
All requests start with https://rentmojo-assignment.herokuapp.com/

If you are sending data to the API, include the Content-Type header and the data as JSON.

-------------------------------------------------------------------------------------------------
Authentication
---------------
User must authenticate the user before accessing the api routes.

To authenticate the user the routes are :


Login :
-------
https://rentmojo-assignment.herokuapp.com/login 

Method POST 

BODY {email, password}



Signup 
-------
https://rentmojo-assignment.herokuapp.com/signup

Method POST

BODY {email, password}

On successful authentication, a web token will be returned.

-------------------------------------------------------------------------------------------------
# How to use the Web Token?

The web token is a JWT token. The web token has to be included on every subsequent API call.


Include the web token as a header with your request : 
-
Authorization    Bearer {accessToken}


Result : 

{

    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwd2QiLCJpYXQiOjE2MTM4MDEzMTN9.FzMlnRP3Zjqb-33Y1_V078vDBQfXTJyBNjudQHwuDTU"
    
}

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
API ROUTES:
-------------------------------------------------------------------------------------------------

-GET :
-----------

Route1 :        https://rentmojo-assignment.herokuapp.com/api/contact

                Gives the details of the user with given email and phone.
                
                URL query parameters : name, email, page
                
URL example :   https://rentmojo-assignment.herokuapp.com/api/contact?phone=123&email=email@gmail.co&page=1

-----------

Route2 :        https://rentmojo-assignment.herokuapp.com/api/all-contacts

                Gives the details of all the users 10 contacts at a time.
                
                URL query parameters : page
                
URL example :   https://rentmojo-assignment.herokuapp.com/api/all-contacts?page=1       

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

-POST :
-----------

Route :         https://rentmojo-assignment.herokuapp.com/api/contact

                Adds new contact to the phonebook with given name, email and phone.
                
                BODY(JSON) : name, email, phone
                
URL example :   https://rentmojo-assignment.herokuapp.com/api/contact      

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

-PUT :
-----------

Route :         https://rentmojo-assignment.herokuapp.com/api/contact

                Modifies the contact in the phonebook with given name, email and phone.
                
                BODY(JSON) : name, email, phone
                
URL example :   https://rentmojo-assignment.herokuapp.com/api/contact      

-------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------
-DELETE :
-----------

Route :         https://rentmojo-assignment.herokuapp.com/api/contact

                Deletes the contact in the phonebook with given email.
                
                URL Query Parameters : email
                
URL example :   https://rentmojo-assignment.herokuapp.com/api/contact?email@gmail.com 

-------------------------------------------------------------------------------------------------
