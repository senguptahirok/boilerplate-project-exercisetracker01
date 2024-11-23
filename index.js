const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let m_uri = process.env.MONGO_URI;
let Person;
let m_connect = require('mongoose');
m_connect.connect(m_uri,{useNewUrlParser: true, useUnifiedTopology: true});
let personSchema = new m_connect.Schema({
  name:{
    type: String,
    required: true
  }
});

Person = m_connect.model('Person', personSchema);

const createAndSavePerson = function(userName, done){
  let a = {name: userName};
  let b = new Person(a);
  b.save(function(err, data){
    if (err) console.log('error in saving user in mongodb = ' + err);
  });
  done(null);
};

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/users',function(req,res){
  let userName = Object.values(req.body).toString();
  createAndSavePerson(userName, done);
  res.json({'username': userName});
});

app.post('/api/users/:_id/exercises',function(req,res){
  let data = Object.values(req.body);
  console.log('data = ' + data);
  res.json({'data = ': data});
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
