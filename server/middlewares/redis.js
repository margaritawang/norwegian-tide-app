const { createClient } = require("redis");

let redisClient = undefined;

async function initializeRedisClient() {
  const redisURL = process.env.REDIS_URI || "redis://localhost:6379";

  if (redisURL) {
    // create the Redis client object
    redisClient = createClient({ url: redisURL }).on("error", (e) => {
      console.error(`Failed to create the Redis client with error:`);
      console.error(e);
    });

    try {
      // connect to the Redis server
      await redisClient.connect();
      console.log(`Connected to Redis successfully!`);
    } catch (e) {
      console.error(`Connection to Redis failed with error:`);
      console.error(e);
    }
  }
}

function redisCachingMiddleware(
  options = {
    EX: 21600, // 6h
  },
  key
) {
  return async (req, res, next) => {
    const cacheKey = req.params[key];

    if (!!redisClient?.isOpen) {
      // if there is some cached data, retrieve it and return it
      const cachedValue = await redisClient.get(cacheKey);
      if (cachedValue) {
        return res.json(JSON.parse(cachedValue));
      } else {
        // override the old res.send to introduce the caching logic
        const oldSend = res.send;
        res.send = async function (data) {
          // set the function back to avoid the 'double-send' effect
          res.send = oldSend;

          // cache the response only if it is successful
          if (res.statusCode.toString().startsWith("2")) {
            await redisClient.set(cacheKey, data, options);
          }

          return res.send(data);
        };

        // continue to the controller function
        next();
      }
    } else {
      // proceed with no caching
      next();
    }
  };
}

module.exports = { initializeRedisClient, redisCachingMiddleware };
