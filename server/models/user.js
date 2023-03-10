const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
