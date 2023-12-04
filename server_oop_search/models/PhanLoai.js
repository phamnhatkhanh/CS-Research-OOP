const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const keyword_extractor = require("keyword-extractor");

const PhanLoaiSchema = new mongoose.Schema(
  {
    tenPhanLoai: {
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
    collection: "PhanLoai",
  }
);
PhanLoaiSchema.pre("save", async function (next) {
  this.slug = slugify(this.tenPhanLoai, {
    lower: true,
    locale: "vi",
  });

  next();
});
const PhanLoai = mongoose.models.PhanLoai || mongoose.model("PhanLoai", PhanLoaiSchema);
module.exports = PhanLoai;
