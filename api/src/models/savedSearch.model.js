const mongoose = require("mongoose")

let savedSearchSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  search_path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('SavedSearch', savedSearchSchema);
