const express = require("express");
const phanLoaiController = require("../controllers/phanloai_controller");

const router = express.Router();

router.route("/").get(phanLoaiController.getPhanLoai);
router.route("/chitiet/:slug").get(phanLoaiController.getPhanLoaiChiTiet);

router.route("/get-all").get(phanLoaiController.getAll);
router.route("/").post(phanLoaiController.createPhanLoai);

module.exports = router;
