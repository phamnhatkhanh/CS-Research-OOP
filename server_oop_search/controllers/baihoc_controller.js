const BaiHoc = require("../models/BaiHoc");
const ChuongHoc = require("../models/ChuongHoc");
const PhanLoai = require("../models/PhanLoai");
const PhanMuc = require("../models/PhanMuc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getBaiHoc = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const skip = (page - 1) * results;

  const data = await BaiHoc.find({}).skip(skip).limit(results).sort("_id").select("-__v");

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

exports.getBaiHocChiTiet = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const data = await BaiHoc.findOne({
    slug: slug,
  })
    .populate("baiHocLienQuan")
    .select("-__v");
  const phanLoaiObject = {};

  return res.status(200).json({
    status: "success",
    data: data,
    phanLoai: phanLoaiObject,
    meta: {
      slug,
    },
  });
});

exports.createBaiHoc = catchAsync(async (req, res, next) => {
  const { phanMuc, tenBaiHoc, noiDung } = req.body;
  if (!phanMuc || !tenBaiHoc || !noiDung) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const createData = await BaiHoc.create({ phanMuc, tenBaiHoc, noiDung });

  return res.status(200).json({
    status: "success",

    data: createData,
    meta: {
      phanMuc,
      tenBaiHoc,
      noiDung,
    },
  });
});

exports.editBaiHoc = catchAsync(async (req, res, next) => {
  const { idBaiHoc, noiDung } = req.body;
  if (!idBaiHoc || !noiDung) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  await BaiHoc.findOneAndUpdate({ _id: idBaiHoc }, { noiDung });

  return res.status(200).json({
    status: "success",

    meta: {
      idBaiHoc,
      noiDung,
    },
  });
});
