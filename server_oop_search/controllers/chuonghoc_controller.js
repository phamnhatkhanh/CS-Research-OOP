const ChuongHoc = require("../models/ChuongHoc");
const PhanMuc = require("../models/PhanMuc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getChuongHoc = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const skip = (page - 1) * results;

  const data = await ChuongHoc.find({}).skip(skip).limit(results).sort("_id").select("-__v");

  return res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
    meta: {
      page: page,
      results: results,
    },
  });
});
exports.getChuongHocChiTiet = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const data = await ChuongHoc.findOne({
    slug: slug,
  })
    .select("-__v")
    .populate({
      path: "phanLoai",
    });
  const getPhanMuc = await PhanMuc.find({
    chuongHoc: data._id,
  }).select("-__v");
  return res.status(200).json({
    status: "success",
    data: data,
    phanMuc: getPhanMuc,
    meta: {
      slug,
    },
  });
});

exports.createChuongHoc = catchAsync(async (req, res, next) => {
  const { phanLoai, tenChuongHoc, noiDung } = req.body;
  if (!phanLoai || !tenChuongHoc || !noiDung) {
    return next(new AppError("Tên phân loại không được để trống ", 404));
  }
  const createData = await ChuongHoc.create({ phanLoai, tenChuongHoc, noiDung });

  return res.status(200).json({
    status: "success",

    data: createData,
    meta: {
      phanLoai,
      tenChuongHoc,
      noiDung,
    },
  });
});
