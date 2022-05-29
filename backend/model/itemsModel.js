const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  content: {
    type: String,
    required: [true, "Item has to have content"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Item has to have a creator"],
  },
});
