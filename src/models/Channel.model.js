const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    banner: {
      type: String,
    },
    image: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    subscriber: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const ChannelModel =
  mongoose.models.Channel || mongoose.model("Channel", ChannelSchema);

module.exports = ChannelModel;
