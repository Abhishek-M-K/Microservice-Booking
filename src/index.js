const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");
const apiV1Routes = require("./routes/index");

const setupAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiV1Routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

setupAndStartServer();
