const { StatusCodes } = require("http-status-codes");

const { BookingService } = require("../services/index");

const bookingServiceInstance = new BookingService();

const create = async (req, res) => {
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
};

module.exports = {
  create,
};
