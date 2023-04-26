const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection=mysql.createConnection({
    host:'192.168.121.111',
    user:'samochody',
    password:'P@3^gCQ1j093',
    database:'samochody'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM `car`";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
       
        res.render('user_index', {
            title : 'Norlys',
            car : rows
        });
    });
});


app.get('/add',(req, res) => {
    res.render('user_add', {
        title : 'Norlys'
    });
});

app.post('/save',(req, res) => { 
    let data = {vin: req.body.vin, tablice: req.body.tablice, data_badania_technicznego: req.body.bt};
    let sql = "INSERT INTO car SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from car where car.id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'Norlys',
            user : result[0]
        });
    });
});


app.post('/update',(req, res) => {
    const userId = req.body.id;
    
    let sql = "update car SET vin='"+req.body.vin+"',  tablice='"+req.body.tablice+"',  data_badania_technicznego='"+req.body.bt+"' where id ="+userId;
    console.log(userId);
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


app.get('/delete/:userId',(req, res) => {
   const userId = req.params.userId;
    let sql = `DELETE from car where car.id = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});