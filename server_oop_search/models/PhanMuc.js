const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const keyword_extractor = require("keyword-extractor");

const PhanMucSchema = new mongoose.Schema(
  {
    chuongHoc: {
      type: mongoose.Schema.ObjectId,
      ref: "ChuongHoc",
      required: true,
    },
    tenPhanMuc: {
      type: String,
      unique: true,
      trim: true,
    },
    noiDung: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    collection: "PhanMuc",
  }
);

PhanMucSchema.pre("save", async function (next) {
  this.slug = slugify(this.tenPhanMuc, {
    lower: true,
    locale: "vi",
  });

  next();
});

const PhanMuc = mongoose.models.PhanMuc || mongoose.model("PhanMuc", PhanMucSchema);
module.exports = PhanMuc;
