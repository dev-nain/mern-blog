import { Schema, model } from "mongoose";

const readingHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    readingTime: {
      type: Number, // Time spent reading in seconds
      default: 0,
    },
    progress: {
      type: Number, // Reading progress percentage (0-100)
      default: 0,
      min: 0,
      max: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastReadAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

readingHistorySchema.index({ user: 1, blog: 1 }, { unique: true });
readingHistorySchema.index({ user: 1, lastReadAt: -1 });
readingHistorySchema.index({ blog: 1, createdAt: -1 });
readingHistorySchema.index({ user: 1, completed: 1, lastReadAt: -1 });

const ReadingHistory = model("ReadingHistory", readingHistorySchema);

export default ReadingHistory;
