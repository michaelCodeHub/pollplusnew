let mongoose = require('mongoose');

// create a model class
let surveySchema = mongoose.Schema({
  surveyTitle: {
    type: String,
    default: "",
    trim: true,
    required: "Title is required"
  },
  surveyAuthor: String,
  createDateAndTime: { 
    type: Date,
    default: Date.now
  },
  surveyFrom: { 
    type: Date,
  },
  surveyTill: { 
    type: Date,
  },
  questions: [{ 
    _id: String,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String
  }]
},
{
    collection: "survey"
});

module.exports = mongoose.model('survey', surveySchema);