const { User } = require("./models");
const jwt = require("jsonwebtoken");
const Key = "dfghjjijhh"; //any random string

const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const isUserExist = await User.findOne({ username: username });
  if (isUserExist) {
    return res.json({
      status: "Error",
      message: "This Username Already Exists",
    });
  }
  if (password.length < 6) {
    return res.json({ status: "Error", message: "Password Length" });
  }

  var newUser = await User.create(req.body);

  newUser.ency_password = undefined;
  newUser.salt = undefined;

  //newUser.save(); //permanent

  return res.json({ status: "User Created successfully", newUser });
};

//middleware
const commonLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.json({
      status: "Error",
      message: "This Username does not Exists",
    });
  }

  if (!user.isAuthenticated(password)) {
    return res.json({
      status: "Error",
      message: "You entered wrong password",
    });
  }

  //token generation->jwt->json web token(library for generate token)
  var token = jwt.sign({ _id: user._id }, Key);

  req.body.token = token;
  req.body.user = user;

  next();
};

const login = async (req, res) => {
  return res.json({ status: "Logged In", data: req.body });
};

const reset = async (req, res) => {
  var user = await User.findOne({ username: req.body.username });
  user.password = req.body.newPassword;
  await user.save();
  return res.json({ status: "Done" });
};

module.exports = { register, login, reset, commonLogin, Key };
