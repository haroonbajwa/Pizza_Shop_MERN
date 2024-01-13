const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
