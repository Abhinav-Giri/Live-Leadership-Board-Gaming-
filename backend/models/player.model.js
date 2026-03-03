const mongoose = require("mongoose");

//schema for player with user_id and score
const playerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Player", playerSchema);