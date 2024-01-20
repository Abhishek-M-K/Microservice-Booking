const axios = require("axios");

const { BookingRepository } = require("../repository/index");
const { FLIGHT_API_URL } = require("../config/serverConfig");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    //data -> flightId, userId, num of seats
    try {
      const flightId = data.flightId;
      const flightUrl = `${FLIGHT_API_URL}/api/v1/flights/${flightId}`;
      const flight = await axios.get(flightUrl);
      const flightData = flight.data.data;
      let priceOfFlight = flightData.flightFare;
      if (data.numberOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Service Error",
          "Cannot create booking",
          "Seats not available",
          500
        );
      }

      const bookingCost = priceOfFlight * data.numberOfSeats;
      const bookingPayload = {
        ...data,
        bookingCost,
      };

      const booking = await this.bookingRepository.create(bookingPayload);
      const updateFlightUrl = `${FLIGHT_API_URL}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightUrl, {
        totalSeats: flightData.totalSeats - booking.numberOfSeats,
      });
      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "confirmed",
      });
      return finalBooking;

      /* return flight.data;
         return flight.data.data;
      flight.data sends booking as well as fetch data from flight api
      therefore only fligt.data.data is required for booking data */
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw new ServiceError();
      }
    }
  }
}

module.exports = BookingService;
