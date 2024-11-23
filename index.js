const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/users',function(req,res){
  let userName = Object.values(req.body).toString();
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
