const mongoose = require("mongoose");
//const { User } = require("../auth/models"); use it if DB is different of each schema and in this case we use User(without inverted commas)

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //User -> from auth schema
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = { Blog };
