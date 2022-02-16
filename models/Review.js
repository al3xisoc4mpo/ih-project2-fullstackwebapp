// models/User.model.js
const { Schema, model, SchemaType } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Reservation",
    },
    dogs: [{
      type: Schema.Types.ObjectId,
      ref: "Dog",
    }],
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Comment is required."],
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
