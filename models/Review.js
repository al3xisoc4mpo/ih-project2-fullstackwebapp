// models/User.model.js
const { Schema, model, SchemaType } = require("mongoose");

const postSchema = new Schema(
  {
    user: {
      type: String,
      trim: true,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    dogs:[{ type: Schema.Types.ObjectId, ref: "Dog" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);