const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const {Model} = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');
const knex = Knex(knexFile.development);
Model.knex(knex);


const port = 3000;
// Endpoints
app.use('/api', require('./api/rental').router)
app.use('/api', require('./api/address').router)
app.use('/api', require('./api/contactinfo').router)
app.use('/api', require('./api/vehicletype').router)
app.use('/api', require('./api/role').router)
app.use('/api', require('./api/image').router)
app.use('/api', require('./api/rentalpoint').router)
app.use('/api', require('./api/vehicle').router)
app.use('/api', require('./api/vehicleImage').router)
app.use('/api', require('./api/user').router)
app.use('/api', require('./api/userRole').router)
app.use('/api', require('./api/review').router)

const fs = require('fs');
const { sign } = require('crypto');

//to be deleted
const loginPage = fs.readFileSync('./public/login.html', 'utf8');
const signupPage = fs.readFileSync('./public/signup.html','utf8');
const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const footerPage = fs.readFileSync('./public/footer.html', 'utf8');

app.get('/login',(req,res)=>{
    res.send(headerPage + loginPage + footerPage);
} )

app.get('/', (req,res)=> {
    return res.redirect('/login');
})


app.get('/signup', (req,res)=> {
    res.send(headerPage + signupPage + footerPage);
})

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Now listening on port", port)
});