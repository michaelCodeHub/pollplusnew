let mongoose = require('mongoose');

// create a model class
let answerSchema = mongoose.Schema({
  surveyId: {
    type: String,
  },
  username: String,
  surveyCompletionDate: { 
    type: Date,
    default: Date.now
  },
  answers: [{ 
    _id: String,
  question: String,
  answer: String
  }]
},
{
    collection: "answer"
});

module.exports = mongoose.model('answer', answerSchema);