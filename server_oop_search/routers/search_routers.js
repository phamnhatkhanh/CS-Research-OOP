const express = require("express");
const searchController = require("../controllers/search_controller");

const router = express.Router();

router.route("/").get(searchController.getSearch);

module.exports = router;
