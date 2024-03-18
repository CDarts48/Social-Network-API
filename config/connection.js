const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// Set 'strictQuery' to true to suppress deprecation warning
mongoose.set("strictQuery", true);

module.exports = mongoose.connection;
