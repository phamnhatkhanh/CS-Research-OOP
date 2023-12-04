const express = require("express");
const phanMucController = require("../controllers/phanmuc_controller");

const router = express.Router();

router.route("/").get(phanMucController.getPhanMuc);
router.route("/chitiet/:slug").get(phanMucController.getPhanMucChiTiet);

router.route("/").post(phanMucController.createPhanMuc);

module.exports = router;
