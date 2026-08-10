const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddlewares");
const { getEmployerAnalytics } = require("../controllers/analyticsController");

router.get("/employer", protect,getEmployerAnalytics);

module.exports = router;