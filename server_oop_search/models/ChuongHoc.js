const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const keyword_extractor = require("keyword-extractor");

const ChuongHocSchema = new mongoose.Schema(
  {
    phanLoai: {
      type: mongoose.Schema.ObjectId,
      ref: "PhanLoai",
      required: true,
    },
    tenChuongHoc: {
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
    },
  },
  {
    collection: "ChuongHoc",
  }
);

ChuongHocSchema.pre("save", async function (next) {
  this.slug = slugify(this.tenChuongHoc, {
    lower: true,
    locale: "vi",
  });

  next();
});
const ChuongHoc = mongoose.models.ChuongHoc || mongoose.model("ChuongHoc", ChuongHocSchema);
module.exports = ChuongHoc;
