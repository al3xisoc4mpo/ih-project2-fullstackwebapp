// models/User.model.js
const { Schema, model, SchemaType } = require("mongoose");

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
    },
    city: {
      type: String,
      required: [true, "City is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    guests: {
      type: Number,
      required: [true, "Guests is required."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      default: 0,
      max:5
    },
    reviews:[{
      type: Schema.Types.ObjectId,
      ref: "Review"
    }],
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Location", locationSchema);
