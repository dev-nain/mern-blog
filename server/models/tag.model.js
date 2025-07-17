import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  name: { type: String, unique: true, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tag = model("Tag", tagSchema);

export default Tag;
