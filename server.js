const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/*
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
*/


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
});
    
    

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => { res.send('it is working!')});
app.post('/imageurl',(req,res) =>{image.handleApiCall(req, res)});

app.post ('/signin',(req,res) =>{signin.handleSignin(req, res, db, bcrypt)});

app.post ('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)});

app.put('/image',(req,res) =>{image.handleImage(req, res, db)});


app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port: ', process.env.PORT);
});

//construction plan
// --> res = this is working
//  /signin  ---> POST = success/fail
//  /register ---> POST = user object
//  /profile/:userID --> GET = user
//  /image  --> PUT --> user or a counter/rank
 



