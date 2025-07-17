import { Schema, model } from "mongoose";

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "List name is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
  }
);

listSchema.index({ user: 1, createdAt: -1 });
listSchema.index({ user: 1, name: 1 });

const List = model("List", listSchema);

export default List;
