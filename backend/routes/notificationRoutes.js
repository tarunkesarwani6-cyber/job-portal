const express = require("express");

const {
  getMyNotifications,
  markAllRead,
} = require("../controllers/notificationController");

const {
  protect,
} = require("../middlewares/authMiddlewares");

const router = express.Router();

router.get(
  "/my",
  protect,
  getMyNotifications
);

router.put(
  "/read-all",
  protect,
  markAllRead
);

module.exports = router;