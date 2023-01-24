const mongoose = require("mongoose");
const uuid = require("uuid");
const CryptoJs = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true, //unnecessary space get removed
    },
    name: String,
    ency_password: String,
    salt: String,
    email: String,
  },
  { timestamps: true }
);

//making virtuals
userSchema.virtual("password").set(function (planPassword) {
  this.salt = uuid.v4();
  this.ency_password = this.securePassword(planPassword);
});

//making methods
userSchema.methods = {
  securePassword: function (planPassword) {
    return CryptoJs.SHA256(planPassword, this.salt).toString();
  },
  isAuthenticated: function (password) {
    return this.securePassword(password) === this.ency_password;
  },
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
