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
    contact: {
      type: String,
      required: [true, "Contact is required."],
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
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

locationSchema.virtual("ratingAverage").get(function () {

  const ratingsArr = [];
  for (const [key, value] of Object.entries(this.reviews)) {
    ratingsArr.push(value.rating);
  }

  if (ratingsArr.length === 0) {
    ratingsArr.push(0);
  }


  const sum = ratingsArr.reduce((a, b) => a + b, 0);

  const locationRating = Math.round((sum / ratingsArr.length) * 10) / 10;
  return locationRating;
});

locationSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

module.exports = model("Location", locationSchema);
