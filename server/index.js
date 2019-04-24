const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const messages = require('./db/MessageModel');

//----------------create an express app---------------------------------------

const app = express();

 // add middleware to add functionality
 //tiny is used to add the log to the app
app.use(morgan('tiny'));
app.use(cors());

//changes data into json object to insert into db
app.use(bodyParser.json({
    extended: true,
    limit: '20mb'
}));

 //add get route to make sure server is working
 //when a get request comes into the server with the url '/' this will run
 //taking the request and giving the response
app.get('/', (req, res) => {
  res.json({
    message: 'full stack messageboard!'
  });
});

//add get route for all messages

app.get('/messages', (req, res) => {
  console.log('request log', req.params);
  messages.getAll().then((messages) => {
    res.json(messages);
  });
});


app.get('/messages/:id', (req, res) => {
  console.log('request log', req.params.id);
  var id = req.params.id
  messages.getById(id).then((message) =>{
    res.json(message)
  });
});

//add delete route
app.delete('/messages/:id', (req, res) => {
  var id = req.params.id
  messages.deleteById(id).then((messages) => {
    res.json(messages);
  }).catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
});

//add post route for message and catch for errors
app.post('/messages', (req, res) => {
  console.log('request log', req.body);
  messages.create(req.body).then((message) => {
    res.json(message);
  }).catch((error) => {
    res.status(500);
    res.json(error);
  });
});



 // create the port for the server to listen on but not hardcoded
 // in case we want to put it on heroku
const port = process.env.PORT || 1234;

 //listen on the port
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
