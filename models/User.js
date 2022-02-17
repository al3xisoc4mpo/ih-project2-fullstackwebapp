// models/User.model.js
const { Schema, model, SchemaType } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    dogs: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
