const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
