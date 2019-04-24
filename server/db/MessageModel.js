const db = require('./connection');
const Joi = require('joi');
const ObjectID = require('mongodb').ObjectID;

//we can do basic validation with joi
//We need to make a schema of requirements for this
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(20).required(),
  subject: Joi.string().required().max(30),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().allow(null, '').uri({
    scheme: [
      /https?/
    ]
  }),
  imageFile: Joi.string().allow(null, '')
});

//variable holds the messages database
const messages = db.get('messages');

//gets all the messages from the messages database
function getAll(){
  return messages.find();
};

//gets one message
function getById(id){
  console.log("getbyidlog", ObjectID(id));
  return messages.find({_id:ObjectID(id)})
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: err });
  });
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

//delete message by id
function deleteById(id){
  console.log("deletebyidlog", ObjectID(id));
  return messages.remove({_id:ObjectID(id)})
  .then(() => messages.find())
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById
};
