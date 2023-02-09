const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //User -> from auth schema
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
