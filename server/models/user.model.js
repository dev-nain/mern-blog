import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/hash-password.js";
import { nanoid } from "nanoid";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [6, "Name must be at least 6 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    username: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro",
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ followers: 1 });
userSchema.index({ following: 1 });

userSchema.pre("save", async function (next) {
  // Generate a username if it doesn't exist
  if (!this.username) {
    let username = this.email.split("@")[0];
    const usernameExist = await this.constructor.findOne({ username });
    if (usernameExist) {
      username = `${username}-${nanoid(4)}`;
    }
    this.username = username;
  }
  // Hash the password if it has been modified
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

const User = model("User", userSchema);

export default User;
