const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },
    
  },
  {
    timestamps: true,
    minimize: false,
  }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
