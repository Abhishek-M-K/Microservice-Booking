const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");
const { messageChannel, publishToQueue } = require("../utils/message-queue");
const { BINDING_KEY } = require("../config/serverConfig");

const bookingServiceInstance = new BookingService();

class BookingController {
  constructor() {}

  async sendToQueue(req, res) {
    try {
      const channel = await messageChannel();
      const data = { message: "hello from queue bot" };
      publishToQueue(channel, BINDING_KEY, JSON.stringify(data));
      return res.status(StatusCodes.OK).json({
        message: "Message sent to queue",
        data: {},
        err: {},
        success: true,
      });
    } catch (error) {
      console.log("Error in sending message to queue", error);
    }
  }

  async create(req, res) {
    try {
      const response = await bookingServiceInstance.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Booking created successfully",
        data: response,
        err: {},
        success: true,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        data: {},
        err: error.explanation,
        success: false,
      });
    }
  }
}

// const create = async (req, res) => {
// try {
//   const response = await bookingServiceInstance.createBooking(req.body);
//   return res.status(StatusCodes.OK).json({
//     message: "Booking created successfully",
//     data: response,
//     err: {},
//     success: true,
//   });
// } catch (error) {
//   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//     message: error.message,
//     data: {},
//     err: error.explanation,
//     success: false,
//   });
// }
// };

module.exports = BookingController;
