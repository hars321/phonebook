const express = require ('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const register = require('./Database/Query/register');
const PORT = process.env.PORT || 4000;
const authenticateToken = require('./authentication');
const cors = require('cors');


// routes
const getdata = require('./Routes/get');
const putdata = require('./Routes/put');
const postdata = require('./Routes/post');
const deletedata = require('./Routes/delete');


// cors middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/api',authenticateToken, getdata);
app.use('/api',authenticateToken, putdata);
app.use('/api',authenticateToken, postdata);
app.use('/api',authenticateToken, deletedata);


app.get('/register',(req,res)=>{
    res.json({
        "Routes":[
            {"/login": {"Method":"POST", "BODY":"email, password"}},
            {"/signup": {"Method":"POST", "BODY":"email, password"}}
        ]
    })
})

app.post('/login',(req,res)=>{
    register.login(req.body)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err);
    })
})

app.post('/signup',(req,res)=>{
    register.signup(req.body)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err);
    })
})


app.get('/',(req,res)=>{
    res.send("Welcome the API");
})

app.listen(PORT,()=>{
    console.log("Listening of PORT: " + PORT );
})