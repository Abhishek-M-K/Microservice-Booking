const express = require("express");

const { BookingController } = require("../../controllers/index");
// const { messageChannel } = require("../../utils/message-queue");

// const channel = await messageChannel();
const bookingControllerInstance = new BookingController();
const router = express.Router();

router.post("/bookings", bookingControllerInstance.create);
router.post("/publish", bookingControllerInstance.sendToQueue);

module.exports = router;
