import { Model, Schema, model } from "mongoose";

const interactionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    viewedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

interactionSchema.index({ user: 1, blog: 1 }, { unique: true });
const Interaction = model("Interaction", interactionSchema);

export default Interaction;
