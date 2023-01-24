//middleware->always have next->type of next is functionand req and res type is object
const jwt = require("jsonwebtoken");
const { Key } = require("../auth/controllers");
const { User } = require("../auth/models");

const isAuthenticated = async (req, res, next) => {
  token = req.headers.authorization;
  //console.log("INFO : ", verify);
  if (!token) {
    return res.json({ status: "Error", message: "Token required" });
  }
  try {
    var verify = jwt.verify(token, Key);
    if (verify && verify._id) {
      var user = await User.findById(verify._id);
      if (!user) {
        return res.json({ status: "Error", message: "Unauthorized user" });
      }
      req.body.user_id = user._id;
      next();
    } else
      return res.json({ status: "Error", message: "Valid Token required" });
  } catch {
    return res.json({ status: "Error", message: "In-Valid Token" });
  }
};

module.exports = { isAuthenticated };

//headers,body,query,params
//services -> ec to instance->linux->ubuntu aws cloud
//h3 bucket->memory
