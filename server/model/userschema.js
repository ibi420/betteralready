const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { 
      type: String,
  },
  email: {
    type: String,
  },

  password: {
    type: String,
  },
  passwordconfirm: {
    type: String,
    validate: {
      validator: function (passwordconfirm) {
        return passwordconfirm === this.password;
      },
      message: "passwords don't match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirmed = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  potentialPassword,
  userPassword
) {
  return await bcrypt.compare(potentialPassword, userPassword);
};
const User = mongoose.model("users", userSchema);

module.exports = User;
