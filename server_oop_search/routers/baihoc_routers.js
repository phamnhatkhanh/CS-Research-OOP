const express = require("express");
const baiHocController = require("../controllers/baihoc_controller");

const router = express.Router();

router.route("/").get(baiHocController.getBaiHoc);
router.route("/chitiet/:slug").get(baiHocController.getBaiHocChiTiet);
router.route("/").post(baiHocController.createBaiHoc);
router.route("/edit").post(baiHocController.editBaiHoc);

module.exports = router;
