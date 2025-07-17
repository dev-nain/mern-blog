import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "like_blog",
        "comment_blog",
        "like_comment",
        "reply_comment",
        "follow_user",
      ],
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ sender: 1, createdAt: -1 });
notificationSchema.index({ blog: 1 });

const Notification = model("Notification", notificationSchema);

export default Notification;
