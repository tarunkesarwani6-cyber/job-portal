const Notification = require(
  "../models/Notification"
);

exports.getMyNotifications = async (
  req,
  res
) => {
  try {
    const notifications =
      await Notification.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.markAllRead = async (
  req,
  res
) => {
  try {
    await Notification.updateMany(
      {
        user: req.user._id,
      },
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications read",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};