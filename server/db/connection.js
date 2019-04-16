const monk = require('monk');

//this is the connection to the database, localhost points to the mongodb
//running on this machine and messageboard points to the database we connect to
const connectionString = 'localhost/messageboard'

//db holds the connection to the database
const db = monk(connectionString);

//export db from the connection file so that we can use it in MessageModel.js
module.exports = db;
