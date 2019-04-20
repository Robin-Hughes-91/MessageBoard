const db = require('./connection');
const Joi = require('joi');

//we can do basic validation with joi
//We need to make a schema of requirements for this
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  subject: Joi.string().required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().allow(null, '').uri({
    scheme: [
      /https?/
    ]
  }),
  imageFile: Joi.string()
});


//variable holds the messages database
const messages = db.get('messages');

//gets all the messages from the messages database
function getAll(){
  return messages.find();
};

//adds function to insert message into the database with validation
function create(message){
  if(!message.username) message.username = 'Anonymous'
  const result = Joi.validate(message, schema);
  if (result.error == null) {
    message.created_on = new Date();
  } else {
    return Promise.reject(result.error);
  }
  return messages.insert(message);
};















module.exports = {
  getAll,
  create
};
