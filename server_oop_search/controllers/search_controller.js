const ChuongHoc = require("../models/ChuongHoc");
const PhanMuc = require("../models/PhanMuc");
const PhanLoai = require("../models/PhanLoai");
const BaiHoc = require("../models/BaiHoc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getSearch = catchAsync(async (req, res, next) => {
  const search = req.query.search;

  const dataPhanLoai = PhanLoai.find({
    tenPhanLoai: { $regex: search, $options: "i" },
  }).select("-__v");
  const dataChuongHoc = ChuongHoc.find({
    tenChuongHoc: { $regex: search, $options: "i" },
  }).select("-__v");
  const dataPhanMuc = PhanMuc.find({
    tenPhanMuc: { $regex: search, $options: "i" },
  }).select("-__v");
  const dataBaiHoc = BaiHoc.find({
    tenBaiHoc: { $regex: search, $options: "i" },
  }).select("-__v");
  const data = await Promise.all([dataPhanLoai, dataChuongHoc, dataPhanMuc, dataBaiHoc]);

  return res.status(200).json({
    status: "success",
    data: {
      phanLoai: data[0],
      chuongHoc: data[1],
      phanMuc: data[2],
      baiHoc: data[3],
    },
    meta: {
      search,
    },
  });
});
