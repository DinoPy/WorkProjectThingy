const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
