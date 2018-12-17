const mongoose = require("mongoose")

let bookmarkSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  application_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  content_id: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
