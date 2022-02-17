// models/User.model.js
const { Schema, model, SchemaType } = require("mongoose");

const dogSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    picture: {
      type: String,
      required: [true, "Name is required."],
    },
    breed: {
      type: String,
      required: [true, "Breed is required."],
    },
    aboutMe: {
      type: String,
      required: [true, "Comment is required."],
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Dog", dogSchema);
