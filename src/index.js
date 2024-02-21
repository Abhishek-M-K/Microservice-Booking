const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT, FLIGHT_API_URL } = require("./config/serverConfig");
const apiV1Routes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  /*app.get("/bookingservice/api/v1/test", (req, res) => {
    return res.json({ message: "API Gateway testing" });
  });*/

  app.use("/bookingservice/api", apiV1Routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    } 

    //console.log(typeof FLIGHT_API_URL);
  });
};

setupAndStartServer();
