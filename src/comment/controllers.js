const { Comment } = require("./models");

//creating comment
const createNewComment = async (req, res) => {
  //console.log(req.body);
  var newComment = (await Comment.create(req.body)).populate("user_id");
  //var allComments = await Comment.find().populate("user_id");
  return res.json({ status: "Created", newComment });
};

//reading comments
//get comment by user id
const getCommentbyUser = async (req, res) => {
  if (req.body.id) {
    var displayComments = await Comment.find({ user_id: req.body.id });
    return res.json({ status: "Comments found", displayComments });
  } else {
    return res.json({ status: "Please Enter User Id" });
  }
};

//get comment by comment id
const getCommentbyId = async (req, res) => {
  var displayComment = await Comment.find({ _id: req.body.id });
  return res.json({ status: "Comment found", displayComment });
};

//update comment
const updateComment = async (req, res) => {
  var _id = req.query.id;
  var data = req.body;
  console.log(_id, data);
  var oneComment = await Comment.findById(_id);
  oneComment.comment = data.comment;
  oneComment = await oneComment.save();
  return res.json({ status: "Comment Updated", oneComment });
};

//delete comment
const deleteComment = async (req, res) => {
  var _id = req.query.id;
  console.log(_id);
  var oneComment = await Comment.findById(_id);
  await Comment.findByIdAndDelete(_id);

  return res.json({ status: "Comment Deleted", oneComment });
};

module.exports = {
  createNewComment,
  updateComment,
  deleteComment,
  getCommentbyUser,
  getCommentbyId,
};
