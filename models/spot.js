const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
  name: String,
  state: String,
  location: String,
  description: String
});

module.exports = mongoose.model('Spot', spotSchema);
