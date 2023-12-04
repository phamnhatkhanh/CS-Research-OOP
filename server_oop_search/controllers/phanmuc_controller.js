const PhanMuc = require("../models/PhanMuc");
const BaiHoc = require("../models/BaiHoc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getPhanMuc = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const skip = (page - 1) * results;

  const data = await PhanMuc.find({}).skip(skip).limit(results).sort("_id").select("-__v");

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
exports.getPhanMucChiTiet = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const data = await PhanMuc.findOne({
    slug: slug,
  })
    .select("-__v")
    .populate({
      path: "chuongHoc",
      populate: {
        path: "phanLoai",
      },
    });
  const getBaiHoc = await BaiHoc.find({
    phanMuc: data._id,
  }).select("-__v");

  return res.status(200).json({
    status: "success",
    data: data,
    baiHoc: getBaiHoc,
    meta: {
      slug,
    },
  });
});

exports.createPhanMuc = catchAsync(async (req, res, next) => {
  const { chuongHoc, tenPhanMuc, noiDung } = req.body;
  if (!chuongHoc || !tenPhanMuc || !noiDung) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const createData = await PhanMuc.create({ chuongHoc, tenPhanMuc, noiDung });

  return res.status(200).json({
    status: "success",

    data: createData,
    meta: {
      chuongHoc,
      tenPhanMuc,
      noiDung,
    },
  });
});
