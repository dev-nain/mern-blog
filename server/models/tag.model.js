import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    toJSON: {
      transform(doc, tag) {
        return tag.name;
      },
    },
  }
);

const Tag = model("Tag", tagSchema);

export default Tag;
