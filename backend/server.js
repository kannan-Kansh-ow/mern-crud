const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

// Express Route
const studentRoute = require('./routes/student.route')

// Connecting mongoDB Database
mongoose
  .connect('mongodb+srv://kannanopenwave:mongo-v1@mern-v1.iiobbps.mongodb.net/mydatabase')
  // .connect('mongodb://127.0.0.1:27017/mydatabase')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/students', studentRoute)

app.get('/', (req,res)=>{
  // res.sendFile(path.join(__dirname) + '/views/index.html');
  res.send('Hello from App Engine!');
});
// PORT
const PORT  = process.env.PORT || 8080;
// const server = app.listen(PORT , () => {
//   console.log('Connected to port ' + PORT )
// })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
