const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_SYNC: process.env.DB_SYNC,
  FLIGHT_API_URL: process.env.FLIGHT_API_URL,
};
