const express = require("express");
const streamToJson = require("./utils/textToJson");
const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { TidalwaterController } = require("./controllers/tidalwater");
const {
  initializeRedisClient,
  redisCachingMiddleware,
} = require("./middlewares/redis");

async function initializeExpressServer() {
  const app = express();
  /**
   * Middlewares
   */
  // Middleware to parse JSON bodies
  app.use(express.json());

  // connect to Redis
  await initializeRedisClient();

  /**
   * Routes
   */
  app.get(
    "/api/tidalwater/:harborName",
    redisCachingMiddleware({
      options: {
        EX: 43200, // 12h
        // TODO: update logic to re-write after noon UTC
        NX: false, // write the data even if the key already exists
      },
    }),
    TidalwaterController.getTidalwaterData
  );

  /**
   * HTTPS server
   */

  // Read SSL certificate and key files
  const privateKey = fs.readFileSync(
    path.resolve(__dirname, "key.pem"),
    "utf8"
  );
  const certificate = fs.readFileSync(
    path.resolve(__dirname, "cert.pem"),
    "utf8"
  );

  // Create credentials object
  const credentials = { key: privateKey, cert: certificate };

  // Create an HTTPS server
  const httpsServer = https.createServer(credentials, app);
  const port = 3000;

  httpsServer.listen(port, () => {
    console.log(`Example https server listening on port ${port}`);
  });
}

initializeExpressServer()
  .then()
  .catch((e) => console.error(e));
