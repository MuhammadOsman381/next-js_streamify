const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    channelID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true } 
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);

module.exports = PostModel;
