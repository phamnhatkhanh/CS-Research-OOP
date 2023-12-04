const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const keyword_extractor = require("keyword-extractor");

const BaiHocSchema = new mongoose.Schema(
  {
    phanMuc: {
      type: mongoose.Schema.ObjectId,
      ref: "PhanMuc",
      required: true,
    },
    baiHocLienQuan: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "BaiHoc",
        required: true,
      },
    ],
    tenBaiHoc: {
      type: String,

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
    collection: "BaiHoc",
    timestamps: true,
  }
);

BaiHocSchema.pre("save", async function (next) {
  this.slug = slugify(this.tenBaiHoc, {
    lower: true,
    locale: "vi",
  });

  next();
});
BaiHocSchema.pre(/^find/, function (next) {
  this.populate({
    path: "phanMuc",
    populate: {
      path: "chuongHoc",
      model: "ChuongHoc",
      populate: {
        path: "phanLoai",
        model: "PhanLoai",
      },
    },
  });

  next();
});

const BaiHoc = mongoose.models.BaiHoc || mongoose.model("BaiHoc", BaiHocSchema);
module.exports = BaiHoc;
