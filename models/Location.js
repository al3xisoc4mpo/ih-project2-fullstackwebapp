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
      unique: true,
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
    classification: {
      type: String,
      enum: ["All dogs are welcome", "Adult dogs only"],
      required: [true, "Classification is required."],
    },
    rating: {
      type: Number,
      required: [true, "Password is required."],
      default: 0,
    },
    host: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Location", locationSchema);
