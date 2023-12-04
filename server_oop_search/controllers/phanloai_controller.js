const PhanLoai = require("../models/PhanLoai");
const PhanMuc = require("../models/PhanMuc");
const ChuongHoc = require("../models/ChuongHoc");
const BaiHoc = require("../models/BaiHoc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getPhanLoai = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const skip = (page - 1) * results;

  const findPhanLoai = await PhanLoai.find({}).skip(skip).limit(results).sort("_id").select("-__v");

  return res.status(200).json({
    status: "success",
    results: findPhanLoai.length,
    data: findPhanLoai,
    meta: {
      page: page,
      results: results,
    },
  });
});
exports.getPhanLoaiChiTiet = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  if (!slug) {
    return next(new AppError("Dữ liệu không được để trống ", 404));
  }
  const data = await PhanLoai.findOne({
    slug: slug,
  }).select("-__v");
  const getChuongHoc = await ChuongHoc.find({
    phanLoai: data._id,
  }).select("-__v");

  return res.status(200).json({
    status: "success",
    data: data,
    chuongHoc: getChuongHoc,
    meta: {
      slug,
    },
  });
});
exports.getAll = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const skip = (page - 1) * results;
  const data = [];
  const findPhanLoai = await PhanLoai.find({}).sort({ _id: 1 });
  const findChuongHoc = await ChuongHoc.find({});
  const findPhanMuc = await PhanMuc.find({});
  const findBaiHoc = await BaiHoc.find({});

  findPhanLoai.forEach((item) => {
    const phanLoaiItem = {};
    phanLoaiItem.idPhanLoai = item._id;
    phanLoaiItem.slug = item.slug;
    phanLoaiItem.tenPhanLoai = item.tenPhanLoai;
    const chuongHoc = [];
    findChuongHoc.forEach((item) => {
      if (String(item.phanLoai) === String(phanLoaiItem.idPhanLoai)) {
        const chuongHocItem = {};
        chuongHocItem.idChuongHoc = item._id;
        chuongHocItem.slug = item.slug;
        chuongHocItem.tenChuongHoc = item.tenChuongHoc;
        const phanMuc = [];
        findPhanMuc.forEach((item) => {
          if (String(item.chuongHoc) === String(chuongHocItem.idChuongHoc)) {
            const phanMucItem = {};
            phanMucItem.idPhanMuc = item._id;
            phanMucItem.slug = item.slug;
            phanMucItem.tenPhanMuc = item.tenPhanMuc;
            phanMucItem.slug = item.slug;
            const baiHoc = [];

            findBaiHoc.forEach((item) => {
              if (String(item.phanMuc._id) === String(phanMucItem.idPhanMuc)) {
                const baiHocItem = {};

                const phanLoaiBaiHocItem = {};
                phanLoaiBaiHocItem.idPhanLoai = phanLoaiItem.idPhanLoai;
                phanLoaiBaiHocItem.tenPhanLoai = phanLoaiItem.tenPhanLoai;

                const chuongBaiHocItem = {};
                chuongBaiHocItem.idChuongHoc = chuongHocItem.idChuongHoc;
                chuongBaiHocItem.tenChuongHoc = chuongHocItem.tenChuongHoc;

                const phanMucBaiHocItem = {};
                phanMucBaiHocItem.idPhanMuc = phanMucItem.idPhanMuc;
                phanMucBaiHocItem.tenPhanMuc = phanMucItem.tenPhanMuc;
                phanMucBaiHocItem.slug = phanMucItem.slug;

                baiHocItem.idBaiHoc = item._id;
                baiHocItem.tenBaiHoc = item.tenBaiHoc;
                baiHocItem.noiDungBaiHoc = item.noiDung;
                baiHocItem.slug = item.slug;
                baiHocItem.phanMuc = phanMucBaiHocItem;
                baiHocItem.chuongHoc = chuongBaiHocItem;
                baiHocItem.phanLoai = phanLoaiBaiHocItem;
                baiHoc.push(baiHocItem);
              }
            });
            phanMucItem.baiHoc = baiHoc;
            phanMuc.push(phanMucItem);
          }
        });
        chuongHocItem.phanMuc = phanMuc;
        chuongHoc.push(chuongHocItem);
      }
    });
    phanLoaiItem.chuongHoc = chuongHoc;
    data.push(phanLoaiItem);
  });

  return res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.createPhanLoai = catchAsync(async (req, res, next) => {
  const { tenPhanLoai, noiDung } = req.body;
  if (!tenPhanLoai || !noiDung) {
    return next(new AppError("Tên phân loại không được để trống ", 404));
  }
  const createPhanLoai = await PhanLoai.create({ tenPhanLoai, noiDung });

  return res.status(200).json({
    status: "success",

    data: createPhanLoai,
    meta: {
      tenPhanLoai,
      noiDung,
    },
  });
});
