const mongoose = require("mongoose");

const GratitudeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }, 
  item: {
    type: String,
    required: true
  },
  category: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("gratitude", GratitudeSchema);
