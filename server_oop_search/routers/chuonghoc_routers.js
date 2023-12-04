const express = require("express");
const chuongHocController = require("../controllers/chuonghoc_controller");

const router = express.Router();

router.route("/").get(chuongHocController.getChuongHoc);
router.route("/chitiet/:slug").get(chuongHocController.getChuongHocChiTiet);

router.route("/").post(chuongHocController.createChuongHoc);

module.exports = router;
